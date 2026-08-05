# Ragni Bags — Website

Bags business ke liye poori website: Home page, Products page, aur ek Admin
Panel jaha se tum bags upload karoge (price, offer price, photo). Photo aur
product data seedha tumhare GitHub repo me commit ho jate hain — koi alag
database nahi chahiye.

## 1. GitHub par upload karo

1. GitHub.com par jao, naya repository banao (e.g. `ragnibags-website`) —
   **Public ya Private** dono chalega.
2. Is poore folder ka content us repo me push kar do:
   ```bash
   cd ragnibags-website
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/<tumhara-username>/ragnibags-website.git
   git push -u origin main
   ```

## 2. GitHub Token banao (image/price upload ke liye)

1. GitHub → Settings → Developer settings → **Fine-grained personal access
   tokens** → Generate new token.
2. Repository access: sirf apna `ragnibags-website` repo select karo.
3. Permissions me **Contents → Read and write** karo.
4. Token generate karke copy kar lo (yeh sirf ek baar dikhega).

## 3. Vercel par deploy karo

1. [vercel.com](https://vercel.com) par GitHub se login karo.
2. "Add New Project" → apna `ragnibags-website` repo import karo.
3. Deploy karne se pehle **Environment Variables** add karo (Settings →
   Environment Variables ya import screen par hi):

   | Key | Value |
   |---|---|
   | `ADMIN_PASSWORD` | jo bhi password tum admin panel ke liye rakhna chahte ho |
   | `GITHUB_TOKEN` | Step 2 wala token |
   | `GITHUB_OWNER` | tumhara GitHub username |
   | `GITHUB_REPO` | `ragnibags-website` (jo naam repo ko diya) |
   | `GITHUB_BRANCH` | `main` |

4. **Deploy** dabao. 2 minute me website live ho jayegi
   (`https://xxxx.vercel.app`).

## 4. Apna domain (ragnibags.in) jodo

Vercel project → Settings → Domains → `ragnibags.in` add karo. Vercel jo
Name Servers/records dega, wahi BigRock me apne domain ki DNS settings me
daal do. 30 min - kuch ghante me live ho jayega.

## 5. Admin panel use karna

- `https://ragnibags.in/admin` par jao.
- `ADMIN_PASSWORD` wala password daalo.
- Bag ka naam, category, MRP (jo cut hoga), Offer Price, photo daal ke
  "Bag Add Karein" dabao.
- Photo seedha tumhare GitHub repo ke `public/products-images/` folder me
  commit ho jati hai, aur data `data/products.json` me save hota hai.
- Website turant naya product dikhane lagegi (dobara deploy karne ki
  zaroorat nahi).

## 6. Apni details badalna

`lib/config.js` file kholo aur badal do:
- `BUSINESS_NAME`, `BUSINESS_TAGLINE`
- `WHATSAPP_NUMBER` — apna WhatsApp number country code ke saath, bina `+`
  ke, jaise `919876543210`
- `CATEGORIES` — bag categories ki list

## Local par test karna (optional)

```bash
npm install
cp .env.example .env.local   # phir values bhar do
npm run dev
```
`http://localhost:3000` par khul jayega.

## Structure

```
app/            → pages (home, products, admin) + API routes
components/     → UI pieces (Hero, ProductCard, HangTag, etc.)
lib/            → GitHub API helper, auth, business config
data/           → products.json (GitHub Contents API se update hota hai)
public/products-images/ → admin se upload ki gayi photos
```
