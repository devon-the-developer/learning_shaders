#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

const int Amount = 8;

void main(){
    vec2 coord = 3.*(sin(u_time / 20.) * 10.) * (gl_FragCoord.xy - u_resolution /2.0)  / min(u_resolution.y, u_resolution.x);
    float len;

    for(int i=0; i < Amount; i++){
        len = length(vec2(coord.x, coord.y));

        coord.x = coord.x - cos(coord.y + cos(len) + cos(u_time / 6.0));
        coord.y = coord.y + sin(coord.x + cos(len) + sin(u_time / 12.0));
    }

    gl_FragColor = vec4(cos(len * 3.), cos(len * 1.5), cos(len * 1.8), 1.0);
}