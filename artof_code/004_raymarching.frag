#ifdef GL_ES
precision mediump float;
#endif

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURFACE_DIST 0.1

uniform vec2 u_resolution;
uniform float u_time;

float getDist(vec3 p){
    vec4 sphere = vec4(0, 1, 6, 1);
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

void main(){
    vec2 coord = (gl_FragCoord.xy -.5 * u_resolution.xy) / u_resolution.y;

    vec3 ro = vec3(0., 1., 1);
    vec3 rd = normalize(vec3(coord.x, coord.y, 1));

    float d = rayMarch(ro, rd);

    d /= 6.;

    vec3 color=vec3(d);

    gl_FragColor = vec4(color, 1.0);
}