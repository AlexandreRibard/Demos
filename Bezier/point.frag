#version 330 core
out vec4 fColor;

float aastep(float threshold, float value) {
  float afwidth = 0.7 * length(vec2(dFdx(value), dFdy(value)));

  return smoothstep(threshold-afwidth, threshold+afwidth, value);
}

void main()
{
	
	// calculate uv coordinate from texture coordinates
    vec2 UV  = 2.0*gl_PointCoord- vec2(1.0);    
    float mag = length(UV);
	float radius = 1.0;
    if (aastep(radius, mag) > 0.5) discard;   // discard pixels outside unit circle
   

	vec3 N = normalize(vec3(UV,0.0));
	vec3 L = normalize(vec3(1,-0.5,0.2));

	float NoL = clamp(dot(N,L),0.0,1.0);
	float diffuse = max(0.0,0.65*NoL + 0.35);

    fColor = diffuse * vec4(1.0,0.0,0.0f, 1.0f); 

}  