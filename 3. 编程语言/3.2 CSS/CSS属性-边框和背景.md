## 背景颜色 `background-color` 

颜色单位：rgba()、rgb()、hsl() 、hsla()、关键字、六进制

**rgba() 和 opacity 属性表示的透明度的区别？**

前者只让设置的元素颜色变得透明，后者让整个元素变得透明，包括元素中包含的内容。

## 背景图片 `background-image`

在一个元素上设置一个或多个背景图片，图片默认在元素 `border` 属性下面，可以通过 `background-origin` 和 `background-clip` 属性改变默认效果。

```css
/* 单个背景 */
background-image: url(media/examples/a.png);

/* 多个背景 */
background-image: url(media/examples/b.png),
                  url(media/examples/c.png);

background-image: linear-gradient(
                    rgba(0, 0, 255, 0.5),
                    rgba(255, 255, 0, 0.5)),
                  url("../../media/examples/lizard.png");

```

### 什么时候使用 HTML 插入图片，什么是时候使用 CSS 背景图片？

首先需要知道的是：HTML &lt;img&gt; 嵌入的图片是内容的一部分，而 CSS 背景颜色纯粹为了装饰页面而存在。

举例说明，网站的 logo，产品的图片等应该使用 HTML 嵌入图片，而一些 icon、美丽的风景则可以用 CSS 背景插入。

但是，这两者没有一个明确的界限，只要记住一点：**如果图片从网页中去掉之后，网页本身仍有意义，那么该图片就可以当作背景图片**。

# 背景与边框

[CSS Backgrounds & Borders](https://www.w3.org/TR/css-backgrounds/) - 相关规范

## 1. 半透明边框

### 现象

默认情况下，背景会延伸到边框所在的区域下面，即 border-box 下。

### 解决方法

使用 `background-clip` 属性，初始值为 `border-box`，意为背景会被边框的外边沿（border-box）裁切掉。其他属性值：`padding-box`、`content-box`，意思分别为被 `padding-box`（内边距的外边沿）和 `content-box`（内容的外边沿）裁切掉。

[试一试](https://codepen.io/byodian/pen/wZYWMM)

## 2. 多重边框

### 现象

css3-background 还在草案阶段时，网页开发者往往使用多个元素模拟多重边框，此举增加了额外的结构污染了布局。

### 解决方案

1. box-shadow 方案

`box-shadow` 第四个参数，又称扩张半径，通过设置正值或负值，可以增大或减小投影面积。当前三个参数（X偏移量、Y偏移量、模糊半径）为零时，得到的投影就是一个实线边框。

另外，`box-shadow` 支持逗号分隔语法，因此可以创建任意数量的边框。

```css
background: yellow;
box-shadow: 0 0 0 10px #f00,
            0 0 0 12px #acc;
```

`box-shadow` 层层叠加，最顶层的扩张半径要比内圈的扩张半径要大。比如我们想在 10px 的扩张半径边框外加一道 5px 的外框，那么就需要指定扩张半径为 15px (10px+5px)。

```css
background: yellow;
box-shadow: 0 0 0 10px #f00,
            0 0 0 15px #acc;
```

**注意事项**

- 投影不影响布局，不受 `box-sizing` 的影响。我们可以通过内边距或外边距为投影腾出所需要占据的空间。

```css
background: #f00;
box-shaodw: 0 0 0 10px #a66;
margin: 10px; // 为外圈投影腾出空间。
```

- 投影不会响应鼠标事件，比如悬停或点击。

[试一试](https://codepen.io/byodian/pen/KYGQBV)

2. outline 方案

为元素创建描边，这种方法只能设置一层外框。优点是边框样式灵活，比如：虚线框、实线框等；还可以通过 `outline-offest` 属性来控制它跟元素边缘之间的距离。

```css
background: #f00;
border: 1px solid #655;
outline: 5px solid #a66;
```

[试一试](https://codepen.io/byodian/pen/oOVPRR)

**注意事项**

- 边框不一定贴合 `border-radius` 属性产生的圆角。
- 根据 CSS 基本 [UI 特性](https://www.w3.org/TR/css-ui-3/)（第三版）规范：描边可以不是矩形。

## 灵活的背景定位

### 现象

CSS 2.1 中，对背景图片进行定位的设置空间有限。

### 1. background-position 方案

[background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position)

在 CSS 背景与边框第三版中，`background-position` 属性得到了扩展，它允许指定背景图片的距离任意角的偏移量，只要我们在偏移量前面指定关键字。

```css
  background: url(cover.png) no-repeat #acc;
  background-position: right 20px bottom 10px;
```

**百分数单位**

- (container width - image width) * (position x%) = (x offset value)
- (container height - image height) * (position y%) = (y offset value)

[试一试](https://codepen.io/byodian/pen/MdwZRX?editors=1100)

### 2. background-origin 方案

### 3. cal() 方案

## 颜色值

- 关键字
- 十六进制
- rgb()、hsl()、rgba()、hsla() [HSL](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Introduction_to_CSS/Values_and_units#HSL)
- 继承


## 总结

- `background-color`
- `background-image`
- `background-size`
- `background-position`
- `background-origin`
- `background-clip`
- `background-attachment`
- clip-path



## 参考

[CSS background](https://marksheet.io/css-background.html)

