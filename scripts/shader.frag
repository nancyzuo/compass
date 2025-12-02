#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// --------------------------------------------------------
// ANIMATED ETHEREAL GRADIENT
// --------------------------------------------------------

float wave(float x) {
    return 0.5 + 0.5 * sin(x);
}

vec3 calmGradient(float y) {
    float t = u_time * 0.6;

    // ARIZONA SUNSET PALETTE
    vec3 bottomBase = vec3(0.95, 0.42, 0.15);  // deep orange
    vec3 midBase    = vec3(1.00, 0.30, 0.45);  // fiery pink-magenta
    vec3 highBase   = vec3(0.40, 0.15, 0.35);  // sunset purple
    vec3 topBase    = vec3(0.12, 0.05, 0.12);  // dusky almost-night

    // animated color breathing
    vec3 drift = vec3(
        0.02 * wave(t * 1.3),
        0.015 * wave(t * 1.8 + 1.2),
        0.02 * wave(t * 0.9 + 2.4)
    );

    // 4-STOP smoothly-blended gradient
    vec3 c1 = mix(bottomBase, midBase, smoothstep(0.00, 0.35, y));
    vec3 c2 = mix(midBase, highBase, smoothstep(0.25, 0.70, y));
    vec3 c3 = mix(highBase, topBase, smoothstep(0.55, 1.00, y));

    // nested mix keeps transition soft & organic
    vec3 col = mix(c1, c2, y);
    col = mix(col, c3, y);

    col += drift;

    // Gently darken top for contrast
    float topFade = smoothstep(0.2, 1.0, y);
    col *= mix(1.0, 0.35, topFade);

    return col;
}




vec3 horizonMist(float y) {
    return vec3(72.0/255.0, 63.0/255.0, 109.0/255.0) * pow(1.0 - y, 10.5) * 1.2;
}

float microStar(vec2 uv, vec2 pos, float r) {
    float d = length(uv - pos);
    return smoothstep(r, 0.0, d);
}

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) *
                 43758.5453123 + u_time * 100.0);
}

// --------------------------------------------------------
// NOISE / FBM
// --------------------------------------------------------

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 st){
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
           (c - a)* u.y * (1.0 - u.x) +
           (d - b)* u.x * u.y;
}

float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.35; // controls how cloud-like it is
    for (int i = 0; i < 5; i++) {
        value += amp * noise(p);
        p *= 2.0;
        amp *= 0.5;
    }
    return value;
}

// --------------------------------------------------------
// SCREEN BLEND
// --------------------------------------------------------

vec3 screenBlend(vec3 base, vec3 blend) {
    return 1.0 - (1.0 - base) * (1.0 - blend);
}

// --------------------------------------------------------
// MAIN
// --------------------------------------------------------

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Base calm sky (now animated!)
    vec3 col = calmGradient(uv.y);
    col += horizonMist(uv.y);

    // --------------------------------------------------------
    // NEBULA LAYER 1 — purple glow
    // --------------------------------------------------------
    vec2 p = uv * 3.0;
    p.x += u_time * 0.02;

    float n1 = fbm(p);
    vec3 neb1 = vec3(0.7, 0.2, 0.9) * pow(n1, 2.0) * 0.6;

    col = screenBlend(col, neb1);

    // --------------------------------------------------------
    // NEBULA LAYER 2 — blue mist
    // --------------------------------------------------------
    vec2 q = uv * 2.0 + vec2(0.0, u_time * 0.015);
    float n2 = fbm(q + 5.0);

    vec3 neb2 = vec3(0.2, 0.6, 1.0) * pow(n2, 1.5) * 0.4;

    col = screenBlend(col, neb2);

    // --------------------------------------------------------
    // ORIGINAL STARS
    // --------------------------------------------------------
    for (float i = 0.0; i < 15.0; i++) {
        vec2 sp = fract(vec2(sin(i*123.44), cos(i*555.88)) * 9999.0 * (0.54 + i));
        sp.y = 0.18 + 0.78 * sp.y;
        float st = microStar(uv, sp, 0.002);
        float b = 0.3 + 0.3 * fract(sin(i*4.42) * 1000.21);
        col += vec3(1.0) * st * b * 0.10;
    }

    // --------------------------------------------------------
    // GLOW WASH
    // --------------------------------------------------------
    float glow = fbm(uv * 40.0);
    col += vec3(glow * 0.03);

    // Grain noise
    float grain = random(uv * u_resolution.xy);
    col += vec3(grain * 0.05);

    col *= 0.5;   // lower = darker background

    gl_FragColor = vec4(col, 1.0);
}
