#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// Soft vertical gradient matching calm sky
vec3 calmGradient(float y) {
    vec3 bottom = vec3(200.0/255.0, 65.0/255.0, 203.0/255.0); // gentle blue-purple
    vec3 top = vec3(17.0/255.0, 10.0/255.0, 32.0/255.0); // deep indigo
    return mix(bottom, top, pow(y, 0.18));
}

// Minimal mist at bottom
vec3 horizonMist(float y) {
    return vec3(72.0/255.0, 63.0/255.0, 109.0/255.0) * pow(1.0 - y, 3.5) * 0.2;
}

// Soft micro-star (just a few pixels wide)
float microStar(vec2 uv, vec2 pos, float r) {
    float d = length(uv - pos);
    return smoothstep(r, 0.0, d);
}

// Simple random noise function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123 + u_time * 100.0);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Calm sky base
    vec3 col = calmGradient(uv.y);

    // Soft horizon glow (optional, keep light)
    col += horizonMist(uv.y);

    // Add a *few* tiny soft stars
    for (float i = 0.0; i < 15.0; i++) {
        vec2 sp = fract(vec2(sin(i*123.44), cos(i*555.88)) * 9999.0 * (0.54 + i));
        sp.y = 0.18 + 0.78 * sp.y;
        float st = microStar(uv, sp, 0.002);
        float b = 0.3 + 0.3 * fract(sin(i*4.42) * 1000.21);
        col += vec3(1.0) * st * b * 0.10;
    }

    // Add grain noise (very subtle)
    float grain = random(uv * u_resolution.xy);
    col += vec3(grain * 0.05); // Adjust 0.03 for grain intensity

    // Output final color
    gl_FragColor = vec4(col, 1.0);
}
