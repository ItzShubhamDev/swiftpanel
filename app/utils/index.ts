import { appKey, appUrl } from '#config/app'
import crypto from 'node:crypto'
import string from '@adonisjs/core/helpers/string'

export function count(total: number, perPage: number, currentPage: number, lastPage: number) {
  if (total <= 0 || perPage <= 0 || currentPage <= 0) {
    return 0
  }
  if (currentPage > lastPage) {
    return 0
  }
  const startIndex = (currentPage - 1) * perPage
  const endIndex = Math.min(startIndex + perPage, total)

  return endIndex - startIndex
}

export function randomString(length: number) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

export function pagination(
  total: number,
  perPage: number,
  currentPage: number,
  lastPage: number,
  path: string
) {
  path = appUrl + path
  return {
    total,
    count: count(total, perPage, currentPage, lastPage),
    per_page: perPage,
    current_page: currentPage,
    total_pages: lastPage,
    links: {
      first: `${path}?page=1`,
      prev: currentPage > 1 ? `${path}?page=${currentPage - 1}` : null,
      next: currentPage < lastPage ? `${path}?page=${currentPage + 1}` : null,
      last: `${path}?page=${lastPage}`,
    },
  }
}

export function isJSONString(str: string) {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

export function formatDate(date: Date) {
  const formattedDate = date
    .toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .replace(',', '')
    .replace(/\//g, '-')

  return formattedDate
}

export function encrypt(text: string) {
  const key = appKey.release()
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = Buffer.concat([iv, cipher.update(text, 'utf8'), cipher.final()])
  return encrypted.toString('base64url')
}

export function decrypt(text: string) {
  const key = appKey.release()
  const input = Buffer.from(text, 'base64url')
  const iv = input.subarray(0, 16)
  const ciphertext = input.subarray(16)
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  let decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()])
  return decrypted.toString('utf8')
}

export function unique(array: any[]) {
  return array.filter((value, index, self) => self.indexOf(value) === index)
}

export function convertObjToCamelCase(obj: Record<string, any>): Record<string, any> {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertObjToCamelCase(item))
  }

  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc: Record<string, any>, key: string): Record<string, any> => {
        const newKey = string.camelCase(key)
        return {
          ...acc,
          [newKey]: convertObjToCamelCase(obj[key]),
        } as Record<string, any>
      },
      {} as Record<string, any>
    )
  }

  return obj
}
