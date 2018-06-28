<template>
  <section id="posts">
    <PostPreview
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
      :excerpt="post.previewText"
      :thumbnailImage="post.thumbnailUrl"
      :id="post.id" />
  </section>
</template>

<script>

import PostPreview from "@/components/Blog/PostPreview";

export default {
  components: {
    PostPreview
  },
  asyncData(context){
    return context.app.$storyapi.get('cdn/stories', {
      version: context.isDev ? 'draft' : 'published',
      starts_with: 'blog/'
    }).then(res => {
      let posts = res.data.stories
        .filter(s=>s.content.component === 'post')
        .map(s=> {
          return {
            title: s.content.title,
            previewText: s.content.summary,
            thumbnailUrl: s.content.thumbnail,
            id: s.full_slug,
          }
        })
      return {posts: posts};
    })
  }
};
</script>

<style scoped>
#posts {
  padding-top: 2rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}

/* flex-direction=row for all viewports >= 35rem */
@media (min-width:35rem) {
  #posts {
    flex-direction: row;
  }
}
</style>
