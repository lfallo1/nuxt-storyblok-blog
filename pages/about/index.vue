<template>
  <section id="about-page" v-editable="blok">
    <h3>{{title}}</h3>
    <p>{{content}}</p>
  </section>
</template>
<script>

  export default {
    asyncData(context){
      return context.app.$storyapi.get(`cdn/stories/about`, {
        version: context.isDev ? 'draft' : 'published'
      }).then(res => {
        return {
          blok: res.data.story.content,
          title: res.data.story.content.title,
          content: res.data.story.content.content
        }
      }, err => {
        //TODO handle post not found
      })
    },
    mounted(){
      this.$storyblok.init();
      this.$storyblok.on('change', ()=>{
        location.reload(true)
      })
    }
  }

</script>

<style scoped>

  #about-page{
    width: 80%;
    max-width: 500px;
    margin: auto;
  }

  #about-page h3{
    padding-top: 15px;
  }

  #about-page p{
    white-space: pre-line;
  }

</style>
