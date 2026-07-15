import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('homepage loads Designs landing', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByLabel('Beautiful Bangladesh hero')).toBeVisible()
  })
})
