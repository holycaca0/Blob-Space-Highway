#ifdef GL_ES
precision highp float;
#endif
uniform vec2 u_resolution;
uniform float u_time;

void main() {

  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  vec2 center = vec2(0.5, 0.5);
  float dist = distance(st, center);

  vec3 color = vec3(1.0, 1.0, 1.0) * pow(1.0 - dist, 20.0);

 
  gl_FragColor = vec4(color, 1.0);
}