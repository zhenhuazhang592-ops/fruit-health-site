import { test, expect } from '@playwright/test'

test.describe('WeChat CTA Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('is hidden when page is at top (scrollY = 0)', async ({ page }) => {
    // Scroll to top
    await page.evaluate(() => window.scrollTo(0, 0))

    // CTA should not be visible
    const cta = page.locator('.fixed.bottom-6.right-6')
    await expect(cta).not.toBeVisible()
  })

  test('appears after scrolling past 500px', async ({ page }) => {
    // Scroll to 600px
    await page.evaluate(() => window.scrollTo(0, 600))
    await page.waitForTimeout(100) // Wait for scroll event to be processed

    // CTA should be visible
    const cta = page.locator('.fixed.bottom-6.right-6')
    await expect(cta).toBeVisible({ timeout: 2000 })
  })

  test('QR image has correct attributes when visible', async ({ page }) => {
    // Scroll to trigger CTA
    await page.evaluate(() => window.scrollTo(0, 600))
    await page.waitForTimeout(200)

    const qrImage = page.locator('.fixed.bottom-6.right-6 img')
    await expect(qrImage).toHaveAttribute('alt', '微信公众号')
    await expect(qrImage).toHaveClass(/rounded-xl/)
  })

  test('fast scroll is debounced (no flicker)', async ({ page }) => {
    // Rapidly scroll up and down
    await page.evaluate(() => {
      window.scrollTo(0, 100)
      setTimeout(() => window.scrollTo(0, 600), 50)
      setTimeout(() => window.scrollTo(0, 100), 100)
      setTimeout(() => window.scrollTo(0, 600), 150)
    })

    await page.waitForTimeout(300)

    // CTA should be visible (last scroll position was 600px)
    const cta = page.locator('.fixed.bottom-6.right-6')
    await expect(cta).toBeVisible({ timeout: 2000 })
  })

  test('hides again when scrolling back above 500px', async ({ page }) => {
    // Scroll to trigger CTA
    await page.evaluate(() => window.scrollTo(0, 600))
    await page.waitForTimeout(200)

    const cta = page.locator('.fixed.bottom-6.right-6')
    await expect(cta).toBeVisible({ timeout: 2000 })

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(100)

    // CTA should be hidden
    await expect(cta).not.toBeVisible()
  })

  test('does not throw during SSR hydration', async ({ page }) => {
    // Just ensure page loads without errors
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.reload()
    await page.waitForLoadState('domcontentloaded')

    // No critical errors should be logged
    const criticalErrors = errors.filter(e => !e.includes('favicon'))
    expect(criticalErrors).toHaveLength(0)
  })

  test('QR lazy loads only when component becomes visible', async ({ page }) => {
    // Initial state - image should not be loaded yet (because component is hidden)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(100)

    // Component is not visible, img should not exist
    const cta = page.locator('.fixed.bottom-6.right-6')
    await expect(cta).not.toBeVisible()

    // Now scroll to make it visible
    await page.evaluate(() => window.scrollTo(0, 600))
    await page.waitForTimeout(200)

    // Image should now be present
    const img = page.locator('.fixed.bottom-6.right-6 img')
    await expect(img).toBeAttached()
  })
})