Add-Type -AssemblyName System.Drawing
$srcPath = "C:\Users\jason\.gemini\antigravity\brain\e966e2c1-9f76-46e2-9220-f38df5c2b472\.user_uploaded\media_1787426614271.png"
$src = [System.Drawing.Image]::FromFile($srcPath)

function ResizeImage([int]$size, [string]$outPath) {
    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)
    
    $ratio = [Math]::Min($size / $src.Width, $size / $src.Height) * 0.90
    $w = [int]($src.Width * $ratio)
    $h = [int]($src.Height * $ratio)
    $x = [int](($size - $w) / 2)
    $y = [int](($size - $h) / 2)
    
    $g.DrawImage($src, $x, $y, $w, $h)
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Generated: $outPath"
}

ResizeImage 192 "c:\assura\app\public\icon-192.png"
ResizeImage 512 "c:\assura\app\public\icon-512.png"
ResizeImage 192 "c:\assura\website\home-nursing-icon-192.png"
ResizeImage 512 "c:\assura\website\home-nursing-icon-512.png"
ResizeImage 192 "c:\assura\website\apple-touch-icon.png"
ResizeImage 192 "c:\assura\app\public\apple-touch-icon.png"
ResizeImage 192 "c:\assura\app\android\app\src\main\res\mipmap-xxxhdpi\ic_launcher.png"
ResizeImage 192 "c:\assura\app\android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_round.png"
ResizeImage 144 "c:\assura\app\android\app\src\main\res\mipmap-xxhdpi\ic_launcher.png"
ResizeImage 144 "c:\assura\app\android\app\src\main\res\mipmap-xxhdpi\ic_launcher_round.png"
ResizeImage 96 "c:\assura\app\android\app\src\main\res\mipmap-xhdpi\ic_launcher.png"
ResizeImage 96 "c:\assura\app\android\app\src\main\res\mipmap-xhdpi\ic_launcher_round.png"
ResizeImage 72 "c:\assura\app\android\app\src\main\res\mipmap-hdpi\ic_launcher.png"
ResizeImage 72 "c:\assura\app\android\app\src\main\res\mipmap-hdpi\ic_launcher_round.png"
ResizeImage 48 "c:\assura\app\android\app\src\main\res\mipmap-mdpi\ic_launcher.png"
ResizeImage 48 "c:\assura\app\android\app\src\main\res\mipmap-mdpi\ic_launcher_round.png"

$src.Dispose()
Write-Output "All icons resized successfully!"
