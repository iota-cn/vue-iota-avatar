# @iota-cn/avatar

## Install
```
npm install @iota-cn/avatar
```

## Use

### Import
```
<script>
import { Avatar, AvatarViewer, AvatarEditor, RawAvatar } from @iota/avatar
...

export default {
    components: {
        'iota-avatar-viewer': AvatarViewer,
        'iota-rawavatar': RawAvatar,
        'iota-avatar-editor': AvatarEditor,
        'iota-avatar': Avatar
    }
    ...
}
...
</script>
```

### AvatarViewer

```
<template>
    <div id="examples">
        <div class='section'>
            <h3>AvatarViewer</h3>
            <code>
            </code>
            <h4>Example</h4>
            <div class='example'>
                <iota-avatar-viewer showUpload
                    nickname="Hi"
                    :img="vueImg"
                    :radius='51' />
            </div>
        </div>
    </div>
</template>
```

#### Props

```
props: {
        showUpload: Boolean,  // Whether show upload icon
        nickname: {           // the name show when image is missing  
            type: String
        },
        img: String,          // avatar image
        width: {              
            type: Number,
            default: 100
        },
        height: {
            type: Number,
            default: 100
        },
        radius: {
            type: Number,
            default: 4
        },
        color: {               // background color
            type: String,
            default: 'gray'
        },
        userStyle: {           // custome styles
            type: Object,
            default() {
                return undefined
            }
        },
        className: String      // custome class
    }
```

### RawAvatar

```
<template>
    <div id="examples">
        <div class='section'>
            <h3>RawAvatar</h3>
            <code>
            </code>
            <h4>Example</h4>
            <div class='example'>
                <iota-rawavatar :img='vueImg'
                    className='example-rawavatar' />
            </div>
        </div>
    </div>
</template>
```

#### Props

```
    props: {
        uploadImg: Function,   // call back to handle image changed(click then select a new image)
        width: Number,         
        height: Number,
        img: String,           // image to show, you can reset it after the 'uploadImg' handler finished.
        tips: Array,           // tips show to the user.
        disabled: Boolean,     // disable click event.
        className: String      // custome class
    }
```

### AvatarEditor

```
<template>
    <div id="examples">
        <div class='section'>
            <h3>AvatarEditor</h3>
            <code>
            </code>
            <h4>Example</h4>
            <div class='example'>
                <div class="example-avatar-editor">
                    <iota-avatar-editor :avatarFile='vueImg' />
                </div>
            </div>
        </div>
    </div>
</template>
```

#### Props

```
    props: {
        title: {                           // Editor title, default: Upload Image
            type: String
        },
        previewHint: {                     // hint of preview, default: Preview
            type: String
        },
        selectImgHint: {                   // hint of select image, default: Select Image
            type: String
        },
        cropHint: {                        // hint of crop, default: Best size 'width'x'height', you can cut it.
            type: String
        },
        onAvatarData: Function,            // call back to process the image content.
        radiusPerc: Number,                // radius percent, default: 100 (%)
        width: Number,                     // width of cut window, default: 100 (px)
        height: Number,                    // height of cut window, default: 100 (px)
        avatarFile: {                      // the image to show
            type: [Object, String, File]
        }
    }
```

### Avatar 

```
<template>
    <div id="examples">
        <div class='section'>
            <h3>AvatarEditor with default Modal</h3>
            <code>
            </code>
            <h4>Example</h4>
            <div class='example'>
                <iota-avatar />
            </div>
        </div>
    </div>
</template>
```

#### Props

```
    props: {
        title: String,          // Editor title, default: Upload Image
        previewHint: String,    // hint of preview, default: Preview
        selectImgHint: String,  // hint of select image, default: Select Image
        cropHint: String,       // hint of crop, default: Best size 'width'x'height', you can cut it.
        onAvatarData: Function, // call back to process the image content.
        width: Number,          // width of cut window, default: 100 (px)
        height: Number,         // height of cut window, default: 100 (px)
        radiusPerc: Number      // radius percent, default: 100 (%)
    }
```

### Example

```
git clone git@github.com:iota-cn/vue-iota-avatar.git

cd vue-iota-avatar
npm i
npm run examples
```

```
 DONE  Compiled successfully in 9558ms                                                                                                                                                        13:15:45


  App running at:
  - Local:   http://localhost:8080/
  ...
```