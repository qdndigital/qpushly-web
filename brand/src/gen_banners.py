LOGO='<svg viewBox="0 140 292 260" style="width:{w}px;height:{h}px"><path fill="{ink}" fill-rule="evenodd" d="M77.97 140L216.54 140A75.37 75.37 0 0 1 291.91 215.37L291.91 285.61A43.09 43.09 0 0 0 265.59 276.63L220.16 276.63L220.15 233.17A28.76 28.76 0 0 0 191.4 204.42L97.4 204.42A25.64 25.64 0 0 0 71.76 230.050L71.76 311.73A25.25 25.25 0 0 0 97.01 336.98L153.14 336.98L153.14 373.67A43.09 43.09 0 0 0 162.12 400L74.33 400A74.33 74.33 0 0 1 0 325.67L0 217.97A77.97 77.97 0 0 1 77.97 140Z"/><path fill="#2F6FED" d="M196.23 293.40H265.59A26.33 26.33 0 0 1 291.91 319.72V373.68A26.33 26.33 0 0 1 265.59 400.00H196.23A26.33 26.33 0 0 1 169.91 373.68V319.72A26.33 26.33 0 0 1 196.23 293.40Z"/><circle cx="267.5" cy="321.1" r="13.4" fill="#F4F1EA"/></svg>'
LOGO_L=open('logo_light.svgt').read(); LOGO_D=open('logo_dark.svgt').read()
def brand(x,y,size,dark=False):
    # Official horizontal logo (brand guidelines §03). size ≈ cap height of the old text lockup; logo height = 1.5×.
    h=int(size*1.9)
    art=(LOGO_D if dark else LOGO_L).replace('{h}',str(h))
    return f'<div class="brand" style="left:{x}px;top:{y-int(size*.25)}px">{art}</div>'
def card(t,b,time,btns=(),dark=False,store='Northline Supply'):
    a=''.join(f'<span class="{"p" if i==0 else ""}">{x}</span>' for i,x in enumerate(btns))
    acts=f'<div class="acts">{a}</div>' if btns else ''
    return f'<div class="ncard{" dk" if dark else ""}"><span class="ic">{store[0]}</span><div><p class="meta"><span>{store}</span><span>{time}</span></p><p class="t">{t}</p><p class="b">{b}</p>{acts}</div></div>'
CARDS=[('Back in stock: Kiln Mug, Slate','The colour you looked at is available again.','now'),
       ('Price drop on something you viewed','Harbour Canvas Tote is now $38.','Wed'),
       ('Still thinking it over?','Your Alder Overshirt is waiting in your cart.','Mon')]
def phone(x,y,s,n=3):
    cs=''.join(card(*c,dark=True) for c in CARDS[:n])
    return f'<div class="ph" style="--s:{s};left:{x}px;top:{y}px"><div class="sc"><span class="island"></span><p class="clock">9:41</p><p class="date">Friday 14 November</p>{cs}</div></div>'
def store(x,y,w,h,scale=1,bar=True):
    b='<div class="bar"><i></i><i></i><i></i><b>northline-supply.com</b></div>' if bar else ''
    return f'<div class="store" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;zoom:{scale}">{b}<div class="nv">Northline Supply</div><div class="ft"><p>Autumn edit</p><h3>Layers for the<br>cold months</h3></div><div class="gr"><i></i><i></i><i></i></div></div>'
def invite(x,y,scale=1):
    return f'<div class="inv" style="left:{x}px;top:{y}px;zoom:{scale}"><p class="t">Get notified?</p><p class="m">We\'ll let you know about restocks, price drops and new arrivals.</p><div class="a"><span class="y">Allow notifications</span><span class="n">Not now</span></div></div>'
def h1(text,x,y,size,w,color=''):
    return f'<h1 style="position:absolute;left:{x}px;top:{y}px;font-size:{size}px;width:{w}px;{color}">{text}</h1>'
def p(text,x,y,size,w,cls='lead'):
    return f'<p class="{cls}" style="position:absolute;left:{x}px;top:{y}px;font-size:{size}px;width:{w}px">{text}</p>'
def pill(text,x,y,size,line=False):
    return f'<span class="pill{" line" if line else ""}" style="position:absolute;left:{x}px;top:{y}px;font-size:{size}px;padding:{size*.75:.0f}px {size*1.3:.0f}px">{text}</span>'
def meta(items,x,y,size,w=1000):
    return f'<div class="bm" style="position:absolute;left:{x}px;top:{y}px;font-size:{size}px;width:{w}px">'+''.join(f'<span>{i}</span>' for i in items)+'</div>'
def col(x,y,w,head,hs,lead=None,ls=None,pilltxt=None,ps=None,metas=None,ms=None,dark=False):
    out=f'<div class="col" style="left:{x}px;top:{y}px;width:{w}px">'
    out+=f'<h1 style="font-size:{hs}px">{head}</h1>'
    if lead: out+=f'<p class="lead" style="font-size:{ls}px;max-width:{min(w, ls*26)}px">{lead}</p>'
    if metas: out+='<div class="bm" style="font-size:%dpx">'%ms+''.join(f'<span>{i}</span>' for i in metas)+'</div>'
    if pilltxt: out+=f'<span class="pill" style="font-size:{ps}px;padding:{ps*.75:.0f}px {ps*1.3:.0f}px">{pilltxt}</span>'
    return out+'</div>'
def scr(img,x,y,w):
    return f'<div class="scr" style="left:{x}px;top:{y}px;width:{w}px"><img src="assets/screens/{img}.jpg"></div>'
def bn(id,w,h,inner,cls=''):
    return f'<section class="bn {cls}" id="{id}" style="width:{w}px;height:{h}px">{inner}</section>'

B=[]
HEAD='Reach shoppers<br>after they leave.'
TAG='One tap,<br>always reachable<span class="dot">.</span>'
SUB='Web push for Shopify. A shopper taps Allow once — no email, no phone number — and your store can bring them back any time, even after they close the browser.'
B.append(('listing/promo-1600x900',bn('promo',1600,900,
  brand(96,72,34)+col(96,200,760,TAG,80,SUB,25,metas=['Campaigns','Abandoned cart','Back in stock','Price drop'],ms=19)
  +store(820,150,600,820,bar=False)+invite(860,560)+phone(1210,110,1.12))))
def shot(id,title,body,img,extra=''):
    return bn(id,1600,900, brand(96,72,32)+col(96,200,540,title,60,body,22)+scr(img,700,150,1000)+extra)
B.append(('listing/01-opt-in',bn('s1',1600,900,brand(96,72,32)+col(96,200,540,'One tap to subscribe.<br>Nothing to type.',60,"Your own invite shows first — your words, your timing, your position. The browser only asks once a shopper says yes.",22)+store(700,150,1000,820,bar=False)+invite(600,436,1.25)+phone(1300,300,0.95,2))))
B.append(('listing/02-campaign',shot('s2','Write it, preview it, send or schedule.','Title, message, image, link and audience. Split-test two versions and see exactly what subscribers will see.','campaign',
  f'<div style="position:absolute;left:470px;top:650px;width:400px">{card("Weekend Flash Sale — 20% off","Two days only. Pick up your favourites before Sunday midnight.","now",("Shop the sale",))}</div>')))
B.append(('listing/03-reminders',shot('s3','Three reminders, each on its own timer.','Five automations — welcome, abandoned cart, browse abandonment, back in stock and price drop. Each reminder has its own delay, copy, icon and buttons.','reminder',
  f'<div style="position:absolute;left:470px;top:650px;width:400px">{card("You left something behind","Your cart is still saved. Check out before it sells out.","1h after",("View cart",))}</div>')))
B.append(('listing/04-subscribers',shot('s4',"Know who’s listening.",'Growth over 7 to 60 days, segments by browser, OS and device, and CSV import from your previous provider.','subscribers')))
B.append(('listing/05-setup',shot('s5','Live in about two minutes.','A five-step checklist takes you from install to your first notification. Starter reminders are written for you, switched off until you turn them on.','setup')))
B.append(('social/og-1200x630',bn('og',1200,630,brand(72,56,28)+col(72,140,600,TAG,58,'Web push for Shopify. Bring shoppers back any time, even after they close the browser.',22,metas=['Campaigns','Five automations','Revenue per send'],ms=17)+store(640,110,520,620)+invite(670,420,0.95)+phone(900,60,0.92))))
B.append(('social/facebook-cover-1640x624',bn('fb',1640,624,brand(180,70,32)+col(180,150,700,TAG,76,'Web push for Shopify stores.',26)+store(900,90,640,600)+invite(930,400)+phone(1250,40,0.95))))
B.append(('social/linkedin-cover-1128x191',bn('li',1128,191,col(340,44,520,'One tap, always reachable<span class="dot">.</span>',32,'Web push for Shopify · campaigns · five automations',15)+f'<div style="position:absolute;left:1130px;top:46px;width:230px;zoom:.8">{card("Back in stock: Kiln Mug","Available again.","now")}</div>')))
B.append(('social/x-header-1500x500',bn('xh',1500,500,col(560,120,560,TAG,58,'Web push for Shopify.',22)+phone(1140,70,0.78,2))))
B.append(('ads/ad-1080x1080-reach',bn('a1',1080,1080,brand(80,72,36)+col(80,170,880,HEAD,96,'One tap to subscribe — no email, no phone number. Bring them back with campaigns and five automations.',30,'Install free on the Shopify App Store',24)+store(80,720,700,600)+invite(110,900,1.05)+phone(640,660,1.0,2))))
cart_phone=phone(560,560,1.25,1).replace('Back in stock: Kiln Mug, Slate','Still thinking it over?').replace('The colour you looked at is available again.','Your Alder Overshirt is waiting in your cart.')
B.append(('ads/ad-1080x1080-cart',bn('a2',1080,1080,brand(80,72,36,dark=True)+col(80,170,880,'The cart they left,<br>on their lock screen.',84,'QPushly reminds subscribers about the cart they left — up to three times, on delays you choose.',30,'Install free',24)+cart_phone,'dark')))
B.append(('ads/ad-1200x628',bn('a3',1200,628,brand(64,52,28)+col(64,124,560,HEAD,66,'Web push for Shopify — one tap to subscribe, five automations, revenue per send.',22,'Install free',20)+store(640,90,520,600)+invite(670,400,0.95)+phone(900,40,0.92))))
B.append(('ads/ad-1080x1920-story',bn('a4',1080,1920,brand(90,140,42)+col(90,250,900,HEAD,112,'One tap to subscribe — no email, no phone number.',36,'Install free on Shopify',30)+phone(215,820,2.1,3))))
B.append(('listing/06-automations',bn('s6',1600,900, brand(96,72,32)
  +col(96,200,540,'Five automations, ready to switch on.',60,'Welcome, abandoned cart, browse abandonment, back in stock and price drop. Each comes written and paused until you turn it on, then reports its own clicks, orders and revenue.',22)
  +'<div class="scr" style="left:700px;top:220px;width:1000px;height:462px"><img src="assets/screens/automations.jpg" style="margin-top:-222px"></div>'
  +f'<div style="position:absolute;left:96px;top:640px;width:430px">{card("Back in stock: Kiln Mug, Slate","The colour you looked at is available again.","now",("Shop now",))}</div>')))
B.append(('youtube/thumbnail-1280x720',bn('yt',1280,720,brand(72,64,30)
  +'<h1 style="position:absolute;left:72px;top:172px;width:700px;font-size:104px;line-height:1.0">Web push<br>for Shopify<br><span style="color:var(--blue)">in 60s.</span></h1>'
  +meta(['Opt-in','Campaigns','Automations','Revenue'],76,560,24,640)
  +phone(830,40,1.15,3))))
B.append(('youtube/thumbnail-1280x720-dark',bn('ytd',1280,720,brand(72,64,30,dark=True)
  +'<h1 style="position:absolute;left:72px;top:172px;width:700px;font-size:104px;line-height:1.0;color:#fff">Web push<br>for Shopify<br><span style="color:#4C8DFF">in 60s.</span></h1>'
  +meta(['Opt-in','Campaigns','Automations','Revenue'],76,560,24,640)
  +phone(830,40,1.15,3),'dark ytd')))
html='<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="base.css"><link rel="stylesheet" href="v2.css"><link rel="stylesheet" href="banners.css"><link rel="stylesheet" href="banners-fresh.css"></head><body>'+''.join(b for _,b in B)+'</body></html>'
open('banners.html','w').write(html)
import json; json.dump([(n, b.split('id="')[1].split('"')[0]) for n,b in B],open('banners.json','w'))
print(len(B))
