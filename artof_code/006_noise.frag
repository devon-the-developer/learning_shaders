#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float noise21(vec2 p) {
    return fract(sin(p.x*100.+p.y*327.)*6575.);
}

float smoothNoise(vec2 coord){
    vec2 lv=fract(coord*10.);
    vec2 id=floor(coord*10.);
    lv=lv*lv*(3.-2.*lv);

    float bottomLeft=noise21(id);
    float bottomRight=noise21(id+vec2(1.,0.));
    float bottom=mix(bottomLeft,bottomRight,lv.x);

    float topLeft=noise21(id+vec2(0.,1.));
    float topRight=noise21(id+vec2(1.,1.));
    float top=mix(topLeft,topRight,lv.x);

    float c=mix(bottom,top,lv.y);
    return c;
}

float smoothNoise2(vec2 coord){
    float c=smoothNoise(coord*4.);
    c+=smoothNoise(coord*8.)*.5;
    c+=smoothNoise(coord*16.)*.25;
    c+=smoothNoise(coord*32.)*.125;
    c+=smoothNoise(coord*64.)*.0625;

    return c/=2.;
}

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    
    float c = smoothNoise2(coord);

    vec3 color = vec3(c);

    gl_FragColor = vec4(color, 1.0);
}