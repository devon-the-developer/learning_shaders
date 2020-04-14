#ifdef GL_ES 
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float rectShape(vec2 position, vec2 scale){
    scale = vec2(0.5) - scale * 0.5;
    vec2 shaper = vec2(step(scale.x, position.x), step(scale.y, position.y));
    shaper *= vec2(step(scale.x, 1.0 - position.x), step(scale.y, 1.0 - position.y));
    return shaper.x * shaper.y;
}

mat2 rotate(float angle){
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main(){
    vec2 position = gl_FragCoord.xy / u_resolution;
    vec2 translate = vec2(0.0, 0.0);
    position += translate * 0.5;
    
    position -=vec2(0.5);
    position = rotate(sin(u_time)) * position;
    position +=vec2(0.5);

    vec3 color = vec3(position.x, position.y, u_time);
    color += vec3(rectShape(position, vec2(0.4, 0.4)));
    gl_FragColor = vec4(color, 1.0);
}