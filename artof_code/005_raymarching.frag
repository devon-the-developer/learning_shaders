#ifdef GL_ES 
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURFACE_DIST 0.1

//Smooths the collision points between two objects
float smin( in float a, in float b, float k){
    float h = max(k - abs(a-b), 0.0);
    return min(a,b) - h * h / (k * 4.0);
}

float getDist(vec3 p){
    vec4 sphere = vec4(0. , 1.5, 5., 0.75);
    float sphereDist = length(p-sphere.xyz)-sphere.w;
    float planeDist = p.y;

    vec4 sphere2=vec4(sin(u_time)/2., sin(u_time)/1.5 + 1.5,sin(u_time) / 4. + 5.,.5);
    float sphere2Dist = length(p-sphere2.xyz)-sphere2.w;

    float spheresDist = smin(sphereDist, sphere2Dist, 0.25);

    float totalDist=min(spheresDist,planeDist);

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

vec3 getLight(vec3 p, vec3 lightPos, vec3 lightCol){
    // vec3 lightPos = vec3(0., 3., 0.);
    vec3 lightVector = normalize(lightPos - p);
    vec3 normalVector = getNormal(p);

    float dif = clamp(dot(normalVector, lightVector), 0., 1.);
    float d = rayMarch(p + normalVector *SURFACE_DIST * 2., lightVector);
    if(d<length(lightPos-p)) dif *=.1;
    return dif * lightCol;
}

void main(){
    vec2 coord = (gl_FragCoord.xy - 0.5 * u_resolution.xy) /  u_resolution.y;
    vec3 rayOrigin = vec3(0., 1., 0.);
    vec3 rayDirection = normalize(vec3(coord.x, coord.y, 1)); 
    
    float d = rayMarch(rayOrigin, rayDirection);

    vec3 p = rayOrigin + rayDirection * d;


    vec3 sunDif = getLight(p, vec3(5., 5., 0.), vec3(1.0, 0.9529, 0.7725));

    vec3 randomDif = getLight(p, vec3(-20., 20., 0.), vec3(0.1294, 0.3608, 0.8627));

    vec3 color = sunDif + randomDif;

    gl_FragColor = vec4(color, 1.0);
}