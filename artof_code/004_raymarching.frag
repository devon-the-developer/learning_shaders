#ifdef GL_ES
precision mediump float;
#endif

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURFACE_DIST 0.1

uniform vec2 u_resolution;
uniform float u_time;

float getDist(vec3 p){
    vec4 sphere = vec4(sin(u_time),  1.25, 6. + cos(u_time)* 2., 0.75);
    float dS = length(p - sphere.xyz) - sphere.w;
    float dP = p.y;
    float d = min(dS, dP);
    return d;
}

float rayMarch(vec3 ro, vec3 rd){
    float dO = 0.; //distance from origin
    for(int i = 0; i < MAX_STEPS; i++){
        vec3 p = ro + dO * rd;
        float dS = getDist(p);
        dO += dS;
        if(dS<SURFACE_DIST || dO > MAX_DIST) break;
    }
    return dO;
}

vec3 getNormal(vec3 p){
    float d = getDist(p);
    vec2 e = vec2(.01, 0.);

    vec3 n = d - vec3(
        getDist(p-e.xyy),
        getDist(p-e.yxy),
        getDist(p-e.yyx));
    return normalize(n);
}

float getLight(vec3 p){
    //Sunlight 
    vec3 sunLightPos = vec3(0, 4, 6);
    sunLightPos.xz += vec2(0, 0) * 2.;
    vec3 l = normalize(sunLightPos-p);
    vec3 n = getNormal(p);
    float dif = clamp(dot(n, l), 0., 1.);
    float d = rayMarch(p+n*SURFACE_DIST *2., l);
    if(d<length(sunLightPos-p))dif*=.1;
    

    //Bounce Light
    vec3 bounceLight=vec3(0.,0.,0.);
    vec3 bl = normalize(bounceLight- p);
    float bounceDif = clamp(dot(n, bl), 0., 1.);
    bounceDif /= 4.;
    float bl_d = rayMarch(p+n*SURFACE_DIST*2.,l);
    if(bl_d<length(bounceLight-p)) 


    return dif + bounceDif;
}

void main(){
    vec2 coord = (gl_FragCoord.xy -.5 * u_resolution.xy) / u_resolution.y;

    vec3 ro = vec3(0., 1., 0);
    vec3 rd = normalize(vec3(coord.x, coord.y, 1));

    float d = rayMarch(ro, rd);

    vec3 p = ro + rd * d;

    float dif = getLight(p);

    vec3 color=vec3(0.9961, 0.9961, 0.7686) * dif;

    gl_FragColor = vec4(color, 1.0);
}