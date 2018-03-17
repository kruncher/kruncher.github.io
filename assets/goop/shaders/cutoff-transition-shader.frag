precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D mask;
uniform float cutoff;

void main(void) {
    vec4 texColor = texture2D(uSampler, vTextureCoord);
    vec4 maskColor = texture2D(mask, vTextureCoord);

    if (maskColor.b < cutoff) {
        texColor = vec4(0, 0, 0, 0);
    }
    else {
        texColor.rgb = (1.0 - cutoff * 0.5) * texColor.rgb;
    }

    gl_FragColor = texColor;
}
