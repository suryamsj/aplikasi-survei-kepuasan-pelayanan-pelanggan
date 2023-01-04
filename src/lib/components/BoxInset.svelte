<script>
    export let result;
</script>

<div class="box_inset">
    <h1>
        <slot name="logo" />
    </h1>
    <div>
        <h3>{result + "%"}</h3>
        <slot name="title" />
        <slot />
    </div>
</div>
