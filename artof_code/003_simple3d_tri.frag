#ifdef GL_ES 
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float distLine(vec3 ro, vec3 rd, vec3 p){
    return length(cross(p-ro, rd)) /length(rd);
}

float drawPoint(vec3 ro, vec3 rd, vec3 p){
    float d = distLine(ro,rd,p);
    d = smoothstep(.09,.089,d);
    return d;
}

void main(){
    vec2 coords = gl_FragCoord.xy / u_resolution;
    coords -= 0.5; 
    coords.x *= u_resolution.x / u_resolution.y;

    float t = u_time;


    float zoom = 1.;
    vec3 ro = vec3(-3. * sin(t), 1., -4. * cos(t));

    vec3 lookat=vec3(.5);
    vec3 f=normalize(lookat-ro);
    vec3 r=cross(vec3(0.,1.,0.),f);
    vec3 u=cross(f,r);

    vec3 c = ro + f * zoom;
    vec3 i = c + coords.x * r + coords.y * u;

    vec3 rd = i - ro;

    float d = 0.;

    //Triangle 
    d += drawPoint(ro, rd, vec3(0., 0., 0.));
    d += drawPoint(ro, rd, vec3(0., 0., 1.));
    d += drawPoint(ro, rd, vec3(1., 0., 1.));
    d += drawPoint(ro, rd, vec3(1., 0., 0.));
    d += drawPoint(ro, rd, vec3(0.5, 1, 0.5));


    gl_FragColor = vec4(d);

}