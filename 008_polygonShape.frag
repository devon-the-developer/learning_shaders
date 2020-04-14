#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.1415926535;

uniform vec2 u_resolution;

float polygon(vec2 position, float radius, float sides){
    position = position * 2.0 - 1.0;
    float angle =  atan(position.x, position.y);
    float slice = PI * 2.0 / sides;

    return step(radius, cos(floor(0.5 + angle / slice) * slice - angle) * length(position));
}

void main(){
    vec2 position = gl_FragCoord.xy / u_resolution;

    vec2 translate=vec2(0.0,0.);

    vec3 color = vec3(position.x, position.y, 0.2);

    position += translate * 0.5;

    float polygon = polygon(position, 0.6, 7.0);

   
    color += vec3(polygon);

    gl_FragColor = vec4(color, 1.0);
}