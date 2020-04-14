#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circleShape (vec2 position, float radius){
    return step(radius, length(position - vec2(0.5)));
}

void main(){
    vec2 position = gl_FragCoord.xy / u_resolution;
    vec2 translate = vec2((sin(u_time) / 2.), cos(u_time) / 2.);
    position += translate * 0.5;
    vec3 color = vec3(position.x, 0.5, position.y);
    color += vec3(circleShape(position, 0.2));
    gl_FragColor = vec4(color, 1.0);
}