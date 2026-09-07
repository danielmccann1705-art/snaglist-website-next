"""Reproduce supplied Stage 1 identity geometry, using licensed Plex glyphs.
Run with Python + fonttools[woff], cairosvg and qrcode; no generated product imagery.
Font input directory is an explicit argument. Outputs are committed assets.
"""
from pathlib import Path
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

root = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1])
out = root / 'public/brand'; out.mkdir(parents=True, exist_ok=True)
fonts = root / 'public/fonts'; fonts.mkdir(parents=True, exist_ok=True)
for name, target in [('PlexSans-Regular.ttf','plex-sans-regular'), ('PlexSans-Medium.ttf','plex-sans-medium'), ('PlexSans-Bold.ttf','plex-sans-bold'), ('PlexMono-Regular.ttf','plex-mono-regular')]:
    f = TTFont(source/name); f.flavor='woff'; f.save(fonts/(target+'.woff'))
(fonts/'OFL.txt').write_bytes((source/'OFL.txt').read_bytes())
font = TTFont(source/'PlexSans-Bold.ttf'); glyphs=font.getGlyphSet(); cmap=font.getBestCmap(); upem=font['head'].unitsPerEm
pin='M12 1C5.9 1 1.5 5.6 1.5 11.5 1.5 19 12 31 12 31s10.5-12 10.5-19.5C22.5 5.6 18.1 1 12 1z'
def text_paths(text, size, x, baseline, colour):
    scale=size/upem; result=[]
    for c in text:
        name=cmap[ord(c)]; pen=SVGPathPen(glyphs); glyphs[name].draw(pen)
        result.append(f'<path d="{pen.getCommands()}" transform="translate({x:g} {baseline:g}) scale({scale:g} {-scale:g})" fill="{colour}"/>')
        x += font['hmtx'][name][0]*scale
    return ''.join(result),x
word,width=text_paths('Snaglıst',200,0,160,'#1A1D23')
prefix=sum(font['hmtx'][cmap[ord(c)]][0] for c in 'Snagl')*200/upem
b=BoundsPen(glyphs);glyphs[cmap[ord('ı')]].draw(b); a,_,z,_=b.bounds
stem=(z-a)*200/upem;cx=prefix+(a+z)/2*200/upem;pw=stem*2.1;ph=pw*32/24
mark=f'<path d="{pin}" fill="#D8321E" transform="translate({cx-pw/2:g} {36-ph:g}) scale({pw/24:g})"/>'
for name,colour in [('wordmark','#1A1D23'),('wordmark-dark','#F7F8FA')]:
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 {min(0,36-ph)-4:g} {width+8:g} {204-min(0,36-ph):g}" role="img" aria-label="Snaglist">'+word.replace('#1A1D23',colour)+mark+'</svg>'
    (out/(name+'.svg')).write_text(svg)
icon=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#1A1D23"/><path d="M0 40H120M0 80H120M40 0V120M80 0V120" stroke="#F7F8FA" stroke-opacity=".18" stroke-width="1.5"/><path d="{pin}" transform="translate(33 20) scale(2.25)" fill="#D8321E"/></svg>'
(out/'icon.svg').write_text(icon)
social='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#1A1D23"/>'
social+=f'<g transform="translate(64 45) scale(.3)">{word.replace("#1A1D23","#F7F8FA")}{mark}</g>'
for txt,y,col in [('Walk the job.',244,'#F7F8FA'),('Mark the snags.',336,'#F7F8FA'),('Hand over the record.',428,'#F7F8FA')]:social+=text_paths(txt,76,64,y,col)[0]
social+=text_paths('snaglist.dev',23,64,560,'#F7F8FA')[0]+'</svg>'
(out/'social.svg').write_text(social)
print('Built outlined wordmarks, icon, social SVG and local fonts.')
