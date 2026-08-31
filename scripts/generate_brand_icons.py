import os
from PIL import Image, ImageDraw, ImageFont

def make_app_icon(size):
    """Creates a high-res, professional square/rounded app icon with medical shield & cross."""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Background gradient: Deep navy to royal cyan
    # Draw rounded rectangle background
    corner_radius = int(size * 0.22)
    draw.rounded_rectangle([0, 0, size, size], radius=corner_radius, fill=(13, 35, 58, 255))

    # Inner subtle glow border
    draw.rounded_rectangle([int(size*0.03), int(size*0.03), int(size*0.97), int(size*0.97)],
                           radius=int(corner_radius*0.9), outline=(14, 165, 233, 180), width=max(2, int(size*0.02)))

    # Medical Cross / Heart emblem in center
    cx, cy = size / 2, size * 0.42
    cw = size * 0.18 # cross arm width
    ch = size * 0.44 # cross total length

    # Draw cyan glowing cross
    draw.rounded_rectangle([cx - cw/2, cy - ch/2, cx + cw/2, cy + ch/2], radius=int(cw*0.3), fill=(14, 165, 233, 255))
    draw.rounded_rectangle([cx - ch/2, cy - cw/2, cx + ch/2, cy + cw/2], radius=int(cw*0.3), fill=(14, 165, 233, 255))

    # Inner white medical cross highlight
    icw = cw * 0.55
    ich = ch * 0.75
    draw.rounded_rectangle([cx - icw/2, cy - ich/2, cx + icw/2, cy + ich/2], radius=int(icw*0.3), fill=(255, 255, 255, 255))
    draw.rounded_rectangle([cx - ich/2, cy - icw/2, cx + ich/2, cy + icw/2], radius=int(icw*0.3), fill=(255, 255, 255, 255))

    # Brand text "ASSURA" at bottom
    font_size = int(size * 0.17)
    try:
        font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", font_size)
    except:
        font = ImageFont.load_default()

    text = "ASSURA"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    tx = (size - tw) / 2
    ty = size * 0.72
    draw.text((tx, ty), text, font=font, fill=(255, 255, 255, 255))

    # Subtitle "NURSING"
    sub_font_size = int(size * 0.085)
    try:
        sub_font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", sub_font_size)
    except:
        sub_font = ImageFont.load_default()

    sub_text = "NURSING"
    sbbox = draw.textbbox((0, 0), sub_text, font=sub_font)
    stw = sbbox[2] - sbbox[0]
    stx = (size - stw) / 2
    sty = size * 0.87
    draw.text((stx, sty), sub_text, font=sub_font, fill=(14, 165, 233, 255))

    return img

def make_horizontal_logo(width=480, height=120):
    """Creates a high-contrast horizontal navbar logo with emblem and typography."""
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Icon on the left
    icon_size = int(height * 0.82)
    icon = make_app_icon(icon_size)
    img.paste(icon, (10, int((height - icon_size) / 2)), icon)

    # Text on the right
    tx = icon_size + 24
    font_size = int(height * 0.42)
    try:
        font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", font_size)
    except:
        font = ImageFont.load_default()

    draw.text((tx, int(height * 0.14)), "ASSURA", font=font, fill=(255, 255, 255, 255))

    sub_size = int(height * 0.22)
    try:
        sub_font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", sub_size)
    except:
        sub_font = ImageFont.load_default()

    draw.text((tx, int(height * 0.60)), "NURSING CARE · 居家护理", font=sub_font, fill=(56, 189, 248, 255))

    return img

def save_all_icons():
    # 1. Base 512 & 192 PWA icons
    icon512 = make_app_icon(512)
    icon192 = make_app_icon(192)
    icon180 = make_app_icon(180)
    logo = make_horizontal_logo(480, 120)

    # Save to app/public
    icon512.save('c:/assura/app/public/icon-512.png')
    icon192.save('c:/assura/app/public/icon-192.png')
    icon180.save('c:/assura/app/public/apple-touch-icon.png')
    logo.save('c:/assura/app/public/logo.png')
    logo.save('c:/assura/app/public/logo_staff_raw.png')

    # Save to website
    icon512.save('c:/assura/website/home-nursing-icon-512.png')
    icon192.save('c:/assura/website/home-nursing-icon-192.png')
    icon180.save('c:/assura/website/apple-touch-icon.png')
    logo.save('c:/assura/website/assura-logo.png')
    logo.save('c:/assura/website/logo_public_raw.png')
    logo.save('c:/assura/website/flyer-logo.png')

    # 2. Android Mipmap Icons for Staff App
    mipmaps = [
        ('mipmap-mdpi', 48),
        ('mipmap-hdpi', 72),
        ('mipmap-xhdpi', 96),
        ('mipmap-xxhdpi', 144),
        ('mipmap-xxxhdpi', 192),
    ]

    for dir_name, size in mipmaps:
        ic = make_app_icon(size)
        target_dir = os.path.join('c:/assura/app/android/app/src/main/res', dir_name)
        os.makedirs(target_dir, exist_ok=True)
        ic.save(os.path.join(target_dir, 'ic_launcher.png'))
        ic.save(os.path.join(target_dir, 'ic_launcher_round.png'))
        ic.save(os.path.join(target_dir, 'ic_launcher_foreground.png'))

        # Also for patient app
        p_target = os.path.join('c:/assura/patient-app/android/app/src/main/res', dir_name)
        if os.path.exists(os.path.dirname(p_target)):
            os.makedirs(p_target, exist_ok=True)
            ic.save(os.path.join(p_target, 'ic_launcher.png'))
            ic.save(os.path.join(p_target, 'ic_launcher_round.png'))
            ic.save(os.path.join(p_target, 'ic_launcher_foreground.png'))

    # 3. Android Splash Screens
    splash_dirs = [
        ('drawable', 480, 800),
        ('drawable-land-hdpi', 800, 480),
        ('drawable-land-mdpi', 480, 320),
        ('drawable-land-xhdpi', 1280, 720),
        ('drawable-land-xxhdpi', 1600, 960),
        ('drawable-land-xxxhdpi', 1920, 1280),
        ('drawable-port-hdpi', 480, 800),
        ('drawable-port-mdpi', 320, 480),
        ('drawable-port-xhdpi', 720, 1280),
        ('drawable-port-xxhdpi', 960, 1600),
        ('drawable-port-xxxhdpi', 1280, 1920),
    ]

    for dir_name, w, h in splash_dirs:
        splash = Image.new('RGBA', (w, h), (7, 21, 38, 255))
        ic_sz = min(w, h) // 3
        ic = make_app_icon(ic_sz)
        splash.paste(ic, ((w - ic_sz) // 2, (h - ic_sz) // 2), ic)

        s_dir = os.path.join('c:/assura/app/android/app/src/main/res', dir_name)
        os.makedirs(s_dir, exist_ok=True)
        splash.save(os.path.join(s_dir, 'splash.png'))

    print("✓ All brand logos, launcher icons, and splash screens generated successfully!")

if __name__ == '__main__':
    save_all_icons()
