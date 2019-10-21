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