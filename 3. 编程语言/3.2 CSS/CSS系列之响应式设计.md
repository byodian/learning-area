# 响应式 Web 设计

## 响应式设计模式

- 移动优先原则
- 响应式文本列 (CSS3 Muti-column Layout - Responsive Text Column)
- 没有媒体查询的响应式 Flexbox (Responsive Flexbox without Media Queries)
- 响应式网格 (Responsive Grids with Grid Template area)

## 响应式设计的内容：

1. 流动网格和布局 (Fluid Grids and Gayouts)
2. 媒体查询适配 (Media Queries)
3. 响应式图片和其他嵌入对象 (Flexible/Responsive Images)
4. 响应式排版 (Resonsive Typography)

## 流动网格和布局

使用 `%` 代替 `px` 作为布局宽度。

### 可伸缩的嵌入式图片和其他媒体对象

#### 具有固定宽高比的图片的可伸缩设计

图片本身具有像素高度和宽度，且*具有固定的宽高比*，所以在响应式设计中给图片设置一个**百分比数值宽度**，高度设置为 **auto**, 这样图片就可以保持自适应。

```html
<div>
    <img src="../img/img.png">
</div>

img {
  width: 100%;
  height: auto;
}
```

但是，width 设置为 100%，随着其容器尺寸的增大，它就会超出其固有的尺寸。这个问题可以通过将 max-width 设置为 100% 解决。

```html
<div>
    <img src="../img/img.png">
</div>

img {
  max-width: 100%;
  height: auto;
}
```

这里通过设置 **max-width** 属性为 100% 让元素变得可伸缩，同时又不会超出其固有大小。

#### 不具有固定宽高比容器的可伸缩性设计

比如 iframe 和 object 元素，就没有固定的宽高比。

```html
<iframe class="wrapper-iframe" width="916" height="515" src="https://www.youtube.com/embed/SMi6p8SKHK4" frameborder="0" allowfullscreen></iframe>

iframe {
  width; 100%;
  height: auto;
}
```

由于 iframe 没有固定的宽高比，在 iframe 元素上设置 width 为 100%, height 为 auto，将不会达到高度自适应的效果。

要解决这个问题，需要使用一些 CSS 技术，首先在 iframe 上包裹一个容器元素：

```html
<div class="resp-container">
    <iframe class="resp-iframe" width="916" height="515" src="https://www.youtube.com/embed/SMi6p8SKHK4" frameborder="0" ></iframe>
</div>
```

设置容器元素 CSS 代码如下：

```css
.resp-container {
  // 宽度默认为父元素的 100%
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;
}
```

- `position: relative` 可以作为子元素 iframe 定位的参考，因为在 CSS 中，设置为 `position: absolute` 的元素相对于它最近的 position 不为 static 的祖先元素来定位；
- `overflow:hidden` 隐藏溢出到容器外面的部分；
- `padding-top` 使用百分比数值设置 padding 可以确保容器有一个正确的宽高比，因为使用百分比数值设置 padding 其实际值基于包含块的宽度计算。此时，容器的宽度等于包含块的宽度，所以 padding-top 实际值等于容器宽度的 56.25%。

设置 iframe 元素 CSS 代码如下：

```css
.resp-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

- `position: absolute` iframe 相对于 `position: relative` 的容器定位
- `top: 0` 和 `left: 0`: 将 iframe 定位到容器的中心
- `width: 100%` 和 `height: 100%`: iframe 的宽高等于容器的宽高，填满了整个容器。

这里有一种情况需要注意，如果不想使 iframe 包装容器的宽度为 100%，我们就的修改 padding-top 的值来确保容器的宽高比不变。但是我们不需要这么做，只要在容器的外面在添加一个包装元素，去设置最外面包装元素的宽度，即可实现灵活布局。

HTML 代码：

```html
<div class="wrapper">
  <div class="resp-container">
      <iframe class="resp-iframe" width="916" height="515" src="https://www.youtube.com/embed/SMi6p8SKHK4" frameborder="0" ></iframe>
  </div>
</div>
```

CSS 代码：

```css
.wrapper {
  width: 85%;
}

.resp-container {
  // 宽度默认为父元素的 100%
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;
}

.resp-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

## 媒体查询

### 浏览器视口的理解

制作页面时，有时候内容会溢出界面或者需要放大页面才能看清，除了设置 CSS，我们还必须理解浏览器视口 (Browser Viewports) 的原理。视口是指浏览器能够显示的区域。

### 媒体查询点 (breakpoints)

常见的断点

- Phones
- Portrait Tables
- Landscape Tables
- Desktop

根据内容的变化添加合适的断点，断点又可分为主要和次要，在主要断点之间调整元素的外边距和内边距，在次要断点之间调整字号大小，行间距等等，比如保证每行 65 个字符。

使用 Sass mixins 编写媒体查询，以及 `@content`、`if` 的用法。

*文件：mixins.scss*

```css
@mixin respond($breakpoint) {

  // @content @if 用法
  @if $breakpoint == phone {
    @media only screen and (max-width: 31.25em) {@content;}
  }

   @if $breakpoint == table-port {
    @media only screen and (max-width: 50em) {@content;}
  }

   @if $breakpoint == table-land {
    @media only screen and (max-width: 75em) {@content;}
  }

   @if $breakpoint == big-desktop {
    @media only screen and (min-width: 120em) {@content;}
  }
}
```

*文件：base.scss*

```css
html {
  font-size: 62.5% // 1rem = 10px

  @include respond(phone) {
    font-size: 56.25%;  //1rem = 9px
  }

  // ...code
}
```

媒体查询应置于何处:

- 影响整个页面布局的媒体查询通常设计很多类名，一般建议放在与布局相关的规则旁边
- 调整网站组件中某些细节的媒体查询，可以放在定义该组件样式的规则旁边
- 布局修改，组件修改，应统一放在样式表最后的位置。可以体现**先通用后具体**的设计模式。

![](https://raw.githubusercontent.com/byodian/logpic/master/breakpoints.png)

### 媒体查询类型

- `screen`
- `print`
- `speech`
- `all`

### 媒体属性

- 每个媒体属性必须写在括号里面

- 在 ` Media Queries Level 4` 中规定了一个媒体属性的写法，即媒体属性可以使用范围值。

  ```css
  @media (height > 600px) {
      body { line-height: 1.4; }
  }

  @media (400px <= width <= 600px) {
      body { line-height: 1.4; }
  }
  ```

**更多的媒体查询属性**

选择不支持 `hover` 设备的查询属性

```css
@media only screen and (max-width: 900px),
       only screen and (hover: none) {
        // code
}
```

背景图片响应式设计的查询属性

```css
  @media only screen and (min-resolution: 192dpi) and (min-width: 37.5em),
         only screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 37.5em),
         only screen and (min-width: 125em) {
  // code
  }
```

### 逻辑操作符

- `and`
- `not`
- `only` 用来阻止旧的浏览器应用样式
- `,` (comma) 相当于逻辑或 `or`

## 移动优先

- 从最小开始设计，考虑内容的重要性以及性能。最重要的内容留在屏幕。代码编写也应该从小到大设计。
- 使用媒体查询（min-width 查询作为主要查询工具，max-width适用于小屏幕样式）添加断点，使用 `em` 单位强化设计。
- 注意点击目标之间的距离

![](https://raw.githubusercontent.com/byodian/logpic/master/mobile-first.png)

**CSS 文件的第一批规则，针对所有屏幕设备**

- 基本的版式：Sizes,colors,line height,heading,paragraphs,lists,links,
- 基本盒子：边框样式，内边距，弹性图片，背景颜色和背景图片
- 基本的跳转和浏览组件：导航，表单和按钮

## 响应式模式

- 掉落列模式 (column Drop)
- 大体流体模式 (Mostly Fluid)
- 画布溢出模式（Off Canvas）
- 布局切换器 (Layout Shifter)

## 响应式布局策略

![](https://raw.githubusercontent.com/byodian/logpic/master/Responsive%20Design.png)

- 设计时，定义宽度时，应采用相对宽度，防止元素溢出视窗。
- CSS 允许内容溢出容器，例如图片等嵌入对象

### Testing for Browser Suport with @supports

- How to use `@supports` feaatures queries;
- implement graceful degradation on selected properties
- How to use `backdrop-filter`.

```css
@supports (-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px)) {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    // other code
}
```

## 响应式图片

响应式图片的目的：在不同大小的屏幕和设备上显示合适的图片，避免在小屏幕上显示过大的图片。
在响应式 web 设计中，首先应该给图片设置一个宽度。

### 3 个方法

1. Decrease image resolution on small screen
2. Half the image resolution on @1x screen
3. Different image on smaller screen

![](https://raw.githubusercontent.com/byodian/logpic/master/resonsive%20image.png)

- 美术设计问题
- 分辨率切换 (Art Direction and Density Switching)

 提供多个图像文件来实现图片响应式设计。

- How to why to use the &lt;picture&gt; element for art direction;
- How to write media queries in HTML.
- How to allow the browser to decide the best image to download, using the `srcset` attribute, width descriptors, and the `sizes` attributes of the &lt;img&gt; element.

### 分辨率切换：不同尺寸

使用相同显示效果，多个不同的分辨率的图片。

在 &lt;img&gt; 和 &lt;source&gt; 元素上，使用 `srcset` 属性。

- `srcset` 定义允许浏览器选择图像集，以及图像的固有宽度。
- `sizes` 定义一组媒体查询条件，并指定图像应该填充的槽宽度。当为真时，加载 `srcset` 列表中与槽宽度最接近的图像。槽宽度单位可使用相对视口单位 `vw`

```html
<img srcset="avatar-320w.jpg 320w,
             avatar-480w.jpg 480w,
             avatar-800w.jpg 800w"
     sizes="(max-width: 56.25em) 20vw,
            (max-width: 37.5em) 20vw,
            300px"
     src="avatar-800w.jpg" alt="photo">
```

还有一种支持多分辨率的写法，`scrset` 和 `X` 语法结合，不需要 `sizes` 属性。

```html
<!-- 1x 是默认值 -->
<img srcset="avatar-1x.jpg,
             avatar-2x.jpg 2x,
             avatar-3x.jpg 3x"
     src="avatar-800w.jpg" alt="photo">
```

### 美术设计问题

提供不同的图片以适应不同的空间分配，使用 &lt;picture&gt; 元素可以实现。

```html
<picture>
  <source media="(min-width: 56.25em)" srcset="avatar-480w.jpg">
  <img src="avatar-800w" alt="photo">
</picture>
```

### CSS 图片的响应式设计

- How to implement responsive images in CSS
- How to usse resolution media queries to target high-resolution screens with 2x
- How to combine multiple conditions in media queries.

```css
@media (min-resolution: 192dpi) and (min-width: 37.5em),
       (-webkit-min-device-pixel-ratio: 2),
       (min-width: 125em) {
          background-image: linear-gradient(
            to right bottom,
            rgba($color-primary-light, 0.8),
            rgba($color-primary-dark, 0.8)),
            url(../img/hero.jpg);
}
```

## 响应式排版

- 随着每行字符的减少，行高也可以减少。
- 屏幕的大小不同，排版的基准尺寸也要调整。[如何为网站设置内容设置合适的文字大小](
 https://trentwalton.com/2012/06/19/fluid-type/)
- 使用弹性字体大小。em、rem 及视口单位（vh、vw、vmin和vmax）
- 设置基准字体大小，需要使用媒体查询修改文本大小。（P240）[可伸缩的排版系统](
  http://typecast.com/blog/a-more-modern-scale-for-web-typography)

## 网站性能优化
## 浏览器渲染优化

## CSS Architecture, Components and BEM

a good strategy, a good mindset

![](https://raw.githubusercontent.com/byodian/logpic/master/Maintainable%20Strategy.png)

- think
- build
- architect

### Think

![](https://raw.githubusercontent.com/byodian/logpic/master/Component-driven%20design.png)

### Build

- BEM named classes

  ![](https://raw.githubusercontent.com/byodian/logpic/master/BEM.png)


### Architecture

```
├── abstracts
|  ├── _functions.scss
|  ├── _mixins.scss
|  └── _variables.scss
├── base
|  ├── _animations.scss
|  ├── _base.scss
|  ├── _typography.scss
|  └── _utilities.scss
├── components
|  └── _button.scss
├── layout
|  └── _header.scss
├── main.scss
└── pages
   └── _home.scss
```

**7 different folders** for partial Sass files, and 1 main Sass file to import all other files into a compiled CSS stylesheet.

The 7 Floders

- base/  —— basic product definitions (reset and styles for the HTML and body elements selectors)
  - This files should be a partial
  - the partial files they always start with an underscore
- components/ —— each component
- layout/ —— the overall layout of the project
- pages/ ——  styles for specific pages of the project
- themes/ —— different visual themes
- abstracts/ —— not output any CSS, such as variables or mix-ins
- vendors/ —— third party CSS
