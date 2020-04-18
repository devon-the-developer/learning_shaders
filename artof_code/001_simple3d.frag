#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float distLine(vec3 ro,vec3 rd,vec3 p){
    return length(cross(p-ro,rd))/length(rd);
}

void main(){
    vec2 coord=gl_FragCoord.xy/u_resolution;
    coord-=.5;
    coord.x*=u_resolution.x/u_resolution.y;
    float t=u_time;
    vec3 color=vec3(coord.x,sin(u_time),coord.y);
    
    // Ray Origin (or camera)
    vec3 ro=vec3(0.,0.,-2.);
    // Ray distance
    vec3 rd=vec3(coord.x,coord.y,0)-ro;
    // Point in space
    vec3 p=vec3(sin(t)*2.,0.,-20.+cos(t)*5.);
    
    float d=distLine(ro,rd,p);
    
    d=smoothstep(.9,.89,d);
    
    gl_FragColor=vec4(d);
}