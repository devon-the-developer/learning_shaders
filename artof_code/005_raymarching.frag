#ifdef GL_ES 
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURFACE_DIST 0.1

float getDist(vec3 p){
    vec4 sphere = vec4(0. , sin(u_time * 4.) + 2., 6., 1.);
    float sphereDist = length(p-sphere.xyz)-sphere.w;
    float planeDist = p.y;
    float totalDist = min(sphereDist, planeDist);
    return totalDist;
}

float rayMarch(vec3 rayOrigin, vec3 rayDirection){
    float dO = 0.; //distance from origin;
    for(int i = 0; i < MAX_STEPS; i++){
        vec3 p = rayOrigin + rayDirection * dO;
        float dS = getDist(p); //distance to the scene;
        dO += dS;
        if(dS < SURFACE_DIST || dO > MAX_DIST) break;
    }
    return dO;
}

vec3 getNormal(vec3 p){
    float d=getDist(p);
    vec2 e=vec2(.01,0.);//area around p
    vec3 n=d-vec3(
    getDist(p-e.xyy),
    getDist(p-e.yxy),
    getDist(p-e.yyx));
    return normalize(n);
}

float getLight(vec3 p){
    vec3 lightPos = vec3(0., 3., 0.);
    vec3 lightVector = normalize(lightPos - p);
    vec3 normalVector = getNormal(p);

    float dif = dot(normalVector, lightVector);
    return dif;
}

void main(){
    vec2 coord = (gl_FragCoord.xy - 0.5 * u_resolution.xy) /  u_resolution.y;
    vec3 rayOrigin = vec3(0., 1., 0.);
    vec3 rayDirection = normalize(vec3(coord.x, coord.y, 1)); 
    
    float d = rayMarch(rayOrigin, rayDirection);

    vec3 p = rayOrigin + rayDirection * d;

    float dif = getLight(p);

    vec3 color = vec3(dif);

    gl_FragColor = vec4(color, 1.0);
}