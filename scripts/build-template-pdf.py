"""Printable snag register and fictional worked example. Not an app-export sample."""
from pathlib import Path
import sys
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
root=Path(__file__).resolve().parents[1]; out=root/'public/downloads';out.mkdir(parents=True,exist_ok=True)
fonts=Path(sys.argv[1])
for file,name in [('PlexSans-Regular.ttf','Plex'),('PlexSans-Bold.ttf','PlexBold')]:pdfmetrics.registerFont(TTFont(name,str(fonts/file)))
ink=HexColor('#1A1D23');rule=HexColor('#D9DCE1');grey=HexColor('#6B7280');marker=HexColor('#D8321E')
width,height=A4
style=ParagraphStyle('body',fontName='Plex',fontSize=11,leading=15,textColor=ink)
def para(c,text,x,y,w):
 p=Paragraph(text,style);_,h=p.wrap(w,1000);p.drawOn(c,x,y-h);return y-h
def header(c,title,sub):
 c.setFillColor(ink);c.setFont('PlexBold',24);c.drawString(40,height-60,title)
 c.setFillColor(grey);c.setFont('Plex',11);c.drawString(40,height-84,sub)
 c.setStrokeColor(marker);c.setLineWidth(2);c.line(40,height-100,width-40,height-100)
def footer(c,page):
 c.setStrokeColor(rule);c.setLineWidth(.6);c.line(40,54,width-40,54)
 c.setFillColor(grey);c.setFont('Plex',10);c.drawString(40,36,'Snaglist  |  usesnaglist.com/snag-list-template');c.drawRightString(width-40,36,str(page))
def label(c,title,x,y,w=240,value=''):
 c.setFillColor(grey);c.setFont('Plex',9);c.drawString(x,y,title)
 c.setFillColor(ink);c.setFont('Plex',11)
 if value:para(c,value,x,y-8,w)
 else:c.setStrokeColor(rule);c.setLineWidth(.5);c.line(x,y-28,x+w,y-28)
def record(c,y,example=False):
 label(c,'Snag reference',40,y,140,'S-0042' if example else '')
 label(c,'Location',205,y,350,'Plot 14, kitchen, hob wall' if example else '')
 label(c,'Description and required action',40,y-58,width-80,'Cracked tile behind the hob. Replace the damaged tile and make good the surrounding grout.' if example else '')
 if not example:c.setStrokeColor(rule);c.line(40,y-106,width-40,y-106)
 label(c,'Trade / contractor',40,y-130,235,'Tiler' if example else '')
 label(c,'Date raised',310,y-130,100,'07/09/2026' if example else '')
 label(c,'Due date',440,y-130,115,'11/09/2026' if example else '')
 label(c,'Status',40,y-187,235,'Submitted for review' if example else '')
 label(c,'Original photo reference',310,y-187,245,'S-0042-before.jpg' if example else '')
 label(c,'Completion photo reference and date submitted',40,y-244,width-80,'S-0042-after.jpg  |  10/09/2026' if example else '')
 label(c,'Manager review / reviewer / review date',40,y-301,width-80,'Pending review. A submitted photo is not approval.' if example else '')
 label(c,'Follow-up notes',40,y-358,width-80,'Compare the submitted photo with the original before accepting the work.' if example else '')
def blank_page(c):
 header(c,'Snag list template','Blank writing sheet - copy for each snag')
 label(c,'Project / plot',40,height-124,width-80);record(c,height-190)
 para(c,'Keep photos in your project folder. Use the snag reference in each filename. Share this record only with the people who need it.',40,145,width-80)
 footer(c,1);c.showPage()
def example_page(c,page=2):
 header(c,'Worked example','Fictional project and dates - an example of how to fill in the template')
 label(c,'Project / plot',40,height-124,width-80,'Example refurbishment - Plot 14');record(c,height-190,True)
 para(c,'Use Open, In progress, Submitted for review, Accepted or Changes requested. Record who reviewed the work and when. These are template labels; app labels may differ.',40,145,width-80)
 footer(c,page);c.showPage()
c=canvas.Canvas(str(out/'snag-list-template.pdf'),pagesize=A4);c.setTitle('Free snag list template - Snaglist');c.setAuthor('Snaglist');blank_page(c);example_page(c);c.save()
c=canvas.Canvas(str(out/'snag-list-worked-example.pdf'),pagesize=A4);c.setTitle('Snag list worked example - fictional project');c.setAuthor('Snaglist');example_page(c,1);c.save()
print('Created printable blank template and fictional worked example.')
