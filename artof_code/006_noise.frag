#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float noise21(vec2 p) {
    return fract(sin(p.x*100.+p.y*327.)*6575.);
}

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    float c = noise21(coord);
    vec3 color = vec3(c);
    gl_FragColor = vec4(color, 1.0);
}