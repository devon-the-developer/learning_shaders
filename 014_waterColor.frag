#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
    vec2 coord = 6. * gl_FragCoord.xy / u_resolution;
    for(int n=1; n < 3; n++){
        float i = float(n);
        coord+=vec2(.7/i * sin(i * coord.y+u_time+.3 * i)+.8,.4/ i * sin(coord.x+u_time+.3 * i)+1.6);
    }
    coord+=vec2(.7/sin(coord.y+u_time+.3)+.8,.4/sin(coord.x+u_time+.3)+1.6);

    vec3 color=vec3((.5*sin(coord.x)+.5),.5*sin(coord.y)+.5,.5*(coord.x+coord.y));

    gl_FragColor = vec4(color, 1.0);
}

