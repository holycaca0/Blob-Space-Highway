precision highp float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
  // Pass the texture coordinate to the fragment shader
  vTexCoord = aTexCoord;

  // Set the position of the vertex
  gl_Position = vec4(aPosition, 1.0);
}