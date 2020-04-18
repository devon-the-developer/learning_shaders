#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


float distLine(vec3 ro, vec3 rd, vec3 p){
    return length(cross(p-ro, rd)) / length(rd);
}

float drawPoint(vec3 ro,vec3 rd,vec3 p){
    float d = distLine(ro,rd,p);
    d = smoothstep(.06,.059,d);
    return d;
}


void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord -= 0.5;
    coord.x *= u_resolution.x / u_resolution.y;
    float t = u_time;
    //Camera Position (Ray Origin)
    vec3 ro = vec3(3. * sin(t), 3. * cos(t), -3. * cos(t));

    //Controls the zoom of the camera
    float zoom = 1.;

    vec3 lookat = vec3(.5);
    vec3 f = normalize(lookat - ro);
    vec3 r = cross(vec3(0., 1., 0.), f);
    vec3 u = cross(f, r);

    vec3 c = ro + f * zoom;
    vec3 i = c + coord.x *r + coord.y * u;

    //Ray Direction is equal to the intersection - ray origin
    vec3 rd = i - ro;

    // vec3 p = vec3(0., 0., -10.);

    float d = 0.;

    d += drawPoint(ro,rd,vec3(0.,0.,0.));
    d += drawPoint(ro,rd,vec3(0.,0.,1.));
    d += drawPoint(ro,rd,vec3(0.,1.,0.));
    d += drawPoint(ro,rd,vec3(0.,1.,1.));
    d += drawPoint(ro,rd,vec3(1.,0.,0.));
    d += drawPoint(ro,rd,vec3(1.,0.,1.));
    d += drawPoint(ro,rd,vec3(1.,1.,0.));
    d += drawPoint(ro,rd,vec3(1.,1.,1.));

    gl_FragColor = vec4(d);
}