<template>
  <ShareNetwork
    :network="this.network"
    :url="this.url"
    :title="this.title"
    :description="this.description"
    quote="The hot reload is so fast it\'s near instant. - Evan You"
    hashtags="vuejs,vite"
  >
    Compartir en 
  </ShareNetwork>
</template>

<script>
export default {
    name: "SocialMediaSharing",
    data() {
        return {
            datos: [
                this.network,
                this.url,
                this.title,
                this.description
            ]
        }
    },
    props: {
        network: String,
        url: String,
        title: String,
        description: String,
    }
}
</script>