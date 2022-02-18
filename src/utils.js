import sanity from './client'
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(sanity)

const CreateURL = (source, width = 300, height = 300) => {
	return builder.image(source).width(width).height(height).url()
}

const TextToHTML = (text) => {
	return text.replace(/\n/g, "<br>")
}

export default {
	CreateURL,
	TextToHTML
}