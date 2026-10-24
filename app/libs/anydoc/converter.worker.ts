// Runs the synchronous anydoc wasm conversion off the main thread so the UI
// stays responsive. The wasm module is lazy-loaded on the first message and
// kept initialized for subsequent conversions.
const ctx = self as unknown as DedicatedWorkerGlobalScope

ctx.onmessage = async (event: MessageEvent<ArrayBuffer>) => {
  try {
    const { default: init, toMarkdownBytes } = await import('@firecrawl/anydoc-wasm')
    await init()

    ctx.postMessage({
      ok: true,
      markdown: toMarkdownBytes(new Uint8Array(event.data)),
    })
  }
  catch (error) {
    ctx.postMessage({
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
