Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630
$bmp = New-Object System.Drawing.Bitmap($width, $height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# Background Gradient
$rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $rect,
    [System.Drawing.ColorTranslator]::FromHtml("#050816"),
    [System.Drawing.ColorTranslator]::FromHtml("#0a102b"),
    45.0
)
$g.FillRectangle($bgBrush, $rect)

# Ambient background nebula glows
$path1 = New-Object System.Drawing.Drawing2D.GraphicsPath
$path1.AddEllipse(650, -50, 600, 600)
$pbr1 = New-Object System.Drawing.Drawing2D.PathGradientBrush($path1)
$pbr1.CenterColor = [System.Drawing.Color]::FromArgb(40, 108, 99, 255)
$pbr1.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 5, 8, 22))
$g.FillPath($pbr1, $path1)

$path2 = New-Object System.Drawing.Drawing2D.GraphicsPath
$path2.AddEllipse(750, 150, 500, 500)
$pbr2 = New-Object System.Drawing.Drawing2D.PathGradientBrush($path2)
$pbr2.CenterColor = [System.Drawing.Color]::FromArgb(35, 56, 189, 248)
$pbr2.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 5, 8, 22))
$g.FillPath($pbr2, $path2)

# Starfield dots
$rand = New-Object System.Random(42)
$starBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(180, 255, 255, 255))
$dimStarBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(90, 160, 190, 255))
for ($i = 0; $i -lt 120; $i++) {
    $sx = $rand.Next(0, $width)
    $sy = $rand.Next(0, $height)
    $sz = if ($rand.Next(0, 10) -gt 7) { 2 } else { 1 }
    $b = if ($sz -eq 2) { $starBrush } else { $dimStarBrush }
    $g.FillEllipse($b, $sx, $sy, $sz, $sz)
}

# Celestial Planet Graphic on Right
$cx = 920
$cy = 315
$rad = 140
$planetPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$planetPath.AddEllipse(($cx - $rad), ($cy - $rad), ($rad * 2), ($rad * 2))
$planetBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($planetPath)
$planetBrush.CenterPoint = New-Object System.Drawing.PointF(($cx - 40), ($cy - 40))
$planetBrush.CenterColor = [System.Drawing.ColorTranslator]::FromHtml("#a78bfa")
$planetBrush.SurroundColors = @([System.Drawing.ColorTranslator]::FromHtml("#2563eb"))
$g.FillEllipse($planetBrush, ($cx - $rad), ($cy - $rad), ($rad * 2), ($rad * 2))

# Planet Orbital Ring
$ringPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(160, 56, 189, 248), 4)
$g.DrawArc($ringPen, ($cx - 240), ($cy - 65), 480, 130, 20, 150)
$g.DrawArc($ringPen, ($cx - 240), ($cy - 65), 480, 130, 200, 140)

# Golden Satellite Dot
$satBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#facc15"))
$g.FillEllipse($satBrush, ($cx + 180), ($cy - 45), 14, 14)

# Text Content (Left Side)
$fontTag = New-Object System.Drawing.Font("Segoe UI", 13, [System.Drawing.FontStyle]::Bold)
$fontTitle = New-Object System.Drawing.Font("Segoe UI", 46, [System.Drawing.FontStyle]::Bold)
$fontSub = New-Object System.Drawing.Font("Segoe UI", 24, [System.Drawing.FontStyle]::Regular)
$fontDesc = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)
$fontBadges = New-Object System.Drawing.Font("Segoe UI", 13, [System.Drawing.FontStyle]::Regular)

$brushTag = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#38bdf8"))
$brushWhite = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#ffffff"))
$brushSub = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#818cf8"))
$brushDesc = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#94a3b8"))
$brushBadges = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#64748b"))

$g.DrawString("PORTFOLIO // FULL-STACK & 3D CONTINUUM", $fontTag, $brushTag, 90, 110)
$g.DrawString("STELLAR PORTFOLIO", $fontTitle, $brushWhite, 86, 145)
$g.DrawString("Sundram Pathak - Full-Stack Engineer", $fontSub, $brushSub, 90, 240)
$g.DrawString("Crafting performant digital experiences with interactive 3D visualizations.", $fontDesc, $brushDesc, 90, 310)

# Divider line
$penLine = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(40, 255, 255, 255), 1)
$g.DrawLine($penLine, 90, 400, 680, 400)

# Tech Stack Badges
$g.DrawString("React   |   Node.js   |   Three.js   |   PostgreSQL   |   GSAP   |   WebGL   |   Tailwind CSS", $fontBadges, $brushBadges, 90, 425)

# Production Origin URL footer
$g.DrawString("https://sundram-stellar.vercel.app", $fontTag, $brushTag, 90, 510)

# Save
$outPath = Join-Path $PSScriptRoot "..\public\og-image.png"
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
Write-Output "og-image.png created successfully at $outPath"
