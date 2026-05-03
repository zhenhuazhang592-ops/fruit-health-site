import { test, expect } from '@playwright/test'

test.describe('Offcanvas Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('hamburger menu button is visible on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    const hamburgerButton = page.getByRole('button', { name: '打开菜单' })
    await expect(hamburgerButton).toBeVisible()
  })

  test('opens offcanvas from left when hamburger is clicked', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const hamburgerButton = page.getByRole('button', { name: '打开菜单' })
    await hamburgerButton.click()

    // Offcanvas should slide in from left
    const offcanvas = page.locator('[class*="fixed left-0 top-0 h-full"]')
    await expect(offcanvas).toBeVisible({ timeout: 1000 })
  })

  test('overlay appears when offcanvas is open', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const hamburgerButton = page.getByRole('button', { name: '打开菜单' })
    await hamburgerButton.click()

    // Overlay should be visible
    const overlay = page.locator('.fixed.inset-0.bg-black\\/40')
    await expect(overlay).toBeVisible({ timeout: 1000 })
  })

  test('closes offcanvas when X button is clicked', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    // Open offcanvas first
    const hamburgerButton = page.getByRole('button', { name: '打开菜单' })
    await hamburgerButton.click()

    // Wait for offcanvas to appear
    await page.waitForTimeout(400)

    // Click close button
    const closeButton = page.getByRole('button', { name: '关闭菜单' })
    await closeButton.click()

    // Wait for animation
    await page.waitForTimeout(400)

    // Offcanvas should be hidden
    const offcanvas = page.locator('[class*="fixed left-0 top-0 h-full"]')
    await expect(offcanvas).not.toBeVisible()
  })

  test('closes offcanvas when overlay is clicked', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    // Open offcanvas first
    const hamburgerButton = page.getByRole('button', { name: '打开菜单' })
    await hamburgerButton.click()

    // Wait for offcanvas to appear
    await page.waitForTimeout(400)

    // Click overlay to close
    const overlay = page.locator('.fixed.inset-0.bg-black\\/40')
    await overlay.click()

    // Wait for animation
    await page.waitForTimeout(400)

    // Offcanvas should be hidden
    const offcanvas = page.locator('[class*="fixed left-0 top-0 h-full"]')
    await expect(offcanvas).not.toBeVisible()
  })

  test('closes offcanvas when Escape key is pressed', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    // Open offcanvas first
    const hamburgerButton = page.getByRole('button', { name: '打开菜单' })
    await hamburgerButton.click()

    // Wait for offcanvas to appear
    await page.waitForTimeout(400)

    // Press Escape
    await page.keyboard.press('Escape')

    // Wait for animation
    await page.waitForTimeout(400)

    // Offcanvas should be hidden
    const offcanvas = page.locator('[class*="fixed left-0 top-0 h-full"]')
    await expect(offcanvas).not.toBeVisible()
  })

  test('swipe gesture closes offcanvas', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    // Open offcanvas first
    const hamburgerButton = page.getByRole('button', { name: '打开菜单' })
    await hamburgerButton.click()

    // Wait for offcanvas to appear
    await page.waitForTimeout(400)

    // Perform swipe right gesture
    const offcanvas = page.locator('[class*="fixed left-0 top-0 h-full"]')
    const box = await offcanvas.boundingBox()

    if (box) {
      await page.mouse.move(box.x + 50, box.y + box.height / 2)
      await page.mouse.down()
      await page.mouse.move(box.x + 200, box.y + box.height / 2)
      await page.mouse.up()
    }

    // Wait for animation
    await page.waitForTimeout(400)

    // Offcanvas should be hidden
    await expect(offcanvas).not.toBeVisible()
  })

  test('navigation links are present in offcanvas', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    // Open offcanvas
    const hamburgerButton = page.getByRole('button', { name: '打开菜单' })
    await hamburgerButton.click()

    // Wait for offcanvas to appear
    await page.waitForTimeout(400)

    // Check nav links
    await expect(page.getByText('水果')).toBeVisible()
    await expect(page.getByText('肉类')).toBeVisible()
    await expect(page.getByText('蔬菜')).toBeVisible()
    await expect(page.getByText('营养知识')).toBeVisible()
  })

  test('clicking nav link closes offcanvas', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    // Open offcanvas
    const hamburgerButton = page.getByRole('button', { name: '打开菜单' })
    await hamburgerButton.click()

    // Wait for offcanvas to appear
    await page.waitForTimeout(400)

    // Click on a nav link
    await page.getByText('水果').click()

    // Wait for animation
    await page.waitForTimeout(400)

    // Offcanvas should be hidden
    const offcanvas = page.locator('[class*="fixed left-0 top-0 h-full"]')
    await expect(offcanvas).not.toBeVisible()
  })

  test('desktop shows full nav instead of hamburger', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })

    // Hamburger should not be visible
    const hamburgerButton = page.getByRole('button', { name: '打开菜单' })
    await expect(hamburgerButton).not.toBeVisible()

    // Desktop nav should be visible
    await expect(page.getByText('水果').first()).toBeVisible()
    await expect(page.getByText('肉类').first()).toBeVisible()
  })
})