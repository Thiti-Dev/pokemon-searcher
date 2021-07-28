import { fonts_importation } from '../../../configs/visualance.json';
var WebFont = require('webfontloader');

export function LoadFonts(): void {
    console.log('[font-importation]: including ', fonts_importation);
    WebFont.load({
        google: {
            families: fonts_importation,
        },
    });
}
