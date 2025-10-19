In my gallery (main view), my maximum rendered size is 318 pixels of width, while the minimum is 147px of width, between all resposive sizes (from 300px to 4kpx as per usual) But then wehn I click an image, I get to the artwkr page (artwork view) where the max rendered width is 926px, and min width is 423px Then I can click the rendered image to view it in a lightbox, where I want the full size of the image. How should I handle this?

https://deepwiki.com/search/i-have-these-profiles-imagetoo_9f3bec5e-8652-4d11-8c88-1ea7dccf844f

# gallery view:

legend: width_of_image @ width_of_screen

more width of screen

175 @ 1536+
(changes to 6 columns)
221 @ 1535
static from 1280 to 1535
221 @ 1280
(changes to 5 columns)
287 @ 1279
linear from 1024 to 1279
223 @ 1024
(changes to 4 columns)
309 @ 1023
linear from 520 to 1024
147 @ 520
(changes to 3 columns)
236 @ 519
linear from 350 to 519
151 @ 350
(changes to 2 columns)
318 @ 349
linear from 0 to 349
(one column)

less width of screen

imagetools({
profiles: {
gallery: new URLSearchParams('w=318&format=webp;jpg'),
detail: new URLSearchParams('w=1536&format=webp;jpg')
}
})
sizes="(min-width: 1536px) 175px, (min-width: 1280px) 221px, (min-width: 1024px) calc((100vw - 1024px) _ 0.251 + 223px), (min-width: 520px) calc((100vw - 520px) _ 0.322 + 147px), (min-width: 350px) calc((100vw - 350px) \* 0.503 + 151px), calc(100vw - 32px)"
