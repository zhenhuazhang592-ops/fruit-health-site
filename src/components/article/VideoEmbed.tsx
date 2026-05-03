'use client'

interface VideoEmbedProps {
  videoId?: string
  title?: string
}

export function VideoEmbed({ videoId, title = '视频' }: VideoEmbedProps) {
  if (!videoId) return null

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 my-8">
      <iframe
        src={`https://mp.weixin.qq.com/mp/video?__biz=xxx&vid=${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
