interface VideoFallbackProps {
  videoId?: string
  title?: string
  qrImageSrc?: string
}

export function VideoFallback({ videoId, title = '视频', qrImageSrc }: VideoFallbackProps) {
  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 my-8 flex flex-col items-center justify-center gap-4">
      <div className="text-center">
        <p className="text-sm text-text-secondary mb-1">视频加载失败</p>
        <p className="text-xs text-text-secondary">
          视频号 ID: {videoId || '未提供'}
        </p>
      </div>

      {qrImageSrc && (
        <div className="flex flex-col items-center gap-2">
          <img
            src={qrImageSrc}
            alt="扫码观看"
            className="w-20 h-20 rounded-lg shadow"
          />
          <span className="text-xs text-text-secondary">长按识别二维码观看</span>
        </div>
      )}
    </div>
  )
}
