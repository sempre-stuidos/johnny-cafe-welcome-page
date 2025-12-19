# SEO Verification Checklist

## Pre-Deployment Testing

### 1. Build & Run Locally
```bash
npm run build
npm run dev
```
- [ ] No build errors
- [ ] No console errors in browser
- [ ] All pages load correctly

### 2. Visual Verification

**Homepage (/):**
- [ ] "Live Jazz Nights" section displays correctly
- [ ] New description paragraph visible
- [ ] Image alt text updated (inspect in DevTools)

**Events Page (/events):**
- [ ] Page title shows "Live Jazz Nights in Toronto East End | Johnny G's Cabbagetown"
- [ ] "Toronto's Best Jazz Night in the East End" heading displays
- [ ] Enhanced description visible
- [ ] All content renders properly

**About Page (/about):**
- [ ] Page loads without errors
- [ ] "Toronto's East End" reference in owner section

**Footer (all pages):**
- [ ] "Live Jazz" is now a clickable link to /events
- [ ] Link works correctly

### 3. Structured Data Validation

**After deployment, test with Google's Rich Results Test:**

1. Visit: https://search.google.com/test/rich-results
2. Enter: https://johnnygsrestaurant.ca
3. Verify: ✅ Restaurant schema detected
4. Enter: https://johnnygsrestaurant.ca/events
5. Verify: 
   - ✅ MusicVenue schema detected
   - ✅ MusicEvent schema detected
   - ✅ BreadcrumbList schema detected

**Check for errors:**
- [ ] No critical errors
- [ ] No missing required fields
- [ ] All schemas valid

### 4. Metadata Verification

**Use browser DevTools → View Page Source:**

**Homepage:**
```html
<title>Johnny G's Restaurant | Breakfast, Lunch, Dinner & Live Jazz in Cabbagetown, Toronto</title>
<meta name="description" content="...live jazz nights every Thursday-Saturday...East End jazz venue..." />
<meta name="keywords" content="...toronto jazz night, east end jazz night..." />
```

**Events Page:**
```html
<title>Live Jazz Nights in Toronto East End | Johnny G's Cabbagetown</title>
<meta name="description" content="...intimate live jazz nights every Thursday-Saturday..." />
```

- [ ] All titles updated
- [ ] All descriptions include target keywords
- [ ] OpenGraph tags present

### 5. Sitemap & Robots

**Test URLs:**
- [ ] https://johnnygsrestaurant.ca/sitemap.xml loads
- [ ] https://johnnygsrestaurant.ca/robots.txt loads
- [ ] Sitemap includes all 5 pages
- [ ] Events page has priority 0.9

### 6. Mobile Responsiveness

**Test on mobile device or DevTools mobile view:**
- [ ] Events page readable on mobile
- [ ] New content displays properly
- [ ] No layout breaks
- [ ] Images load correctly

---

## Post-Deployment Actions

### Immediate (Day 1)

**Google Search Console:**
1. [ ] Submit sitemap: https://johnnygsrestaurant.ca/sitemap.xml
2. [ ] Request indexing for:
   - https://johnnygsrestaurant.ca/events
   - https://johnnygsrestaurant.ca (updated)
3. [ ] Check "Enhancements" section for rich results

**Google Business Profile:**
1. [ ] Add "Music Venue" as secondary category
2. [ ] Upload jazz night photos
3. [ ] Create event posts for upcoming jazz nights
4. [ ] Update description to mention "live jazz Thursday-Saturday"

### Week 1

**Monitor Search Console:**
- [ ] Check for crawl errors
- [ ] Verify structured data detected
- [ ] Monitor impressions for target keywords

**Social Media:**
- [ ] Post about jazz nights with hashtags: #TorontoJazz #EastEndJazz #CabbageTownJazz
- [ ] Tag location in posts
- [ ] Share events page link

### Week 2-4

**Content Updates:**
- [ ] Add jazz night photos to events page
- [ ] Encourage customers to leave reviews mentioning "jazz night"
- [ ] Create Instagram story highlights for jazz nights

**Backlink Outreach:**
- [ ] Submit to BlogTO events calendar
- [ ] Contact NOW Magazine for listing
- [ ] Reach out to Toronto jazz bloggers

### Month 1

**Analytics Review:**
- [ ] Check organic traffic to /events page
- [ ] Review keyword rankings in Search Console
- [ ] Monitor click-through rates
- [ ] Check bounce rate on events page

**Optimization:**
- [ ] Add more jazz-related content if needed
- [ ] Update event descriptions with performer details
- [ ] Create blog post: "Guide to Jazz Nights in Toronto's East End"

---

## Keyword Tracking

**Track these searches weekly:**

| Keyword | Current Rank | Target Rank | Notes |
|---------|-------------|-------------|-------|
| toronto jazz night | ? | #1 | Primary target |
| east end jazz night | ? | #1 | Primary target |
| cabbagetown jazz | ? | Top 3 | Secondary |
| live jazz toronto | ? | Top 5 | Secondary |
| jazz restaurant toronto | ? | Top 10 | Long-tail |
| parliament street jazz | ? | Top 5 | Local |

**Tools to use:**
- Google Search Console (free)
- Google Business Profile Insights (free)
- Manual searches (incognito mode)

---

## Red Flags to Watch For

❌ **If you see these, contact developer:**
- Structured data errors in Search Console
- Pages not indexing after 2 weeks
- Duplicate content warnings
- Mobile usability errors
- Core Web Vitals issues

---

## Quick Win Checklist

**Do these for immediate impact:**

1. **Google Business Profile:**
   - [ ] Add jazz night photos (5-10 images)
   - [ ] Post weekly event updates
   - [ ] Respond to all reviews
   - [ ] Add "Music Venue" category

2. **Social Proof:**
   - [ ] Ask satisfied customers for reviews mentioning "jazz night"
   - [ ] Share user-generated content from jazz nights
   - [ ] Create highlight reel of jazz performances

3. **Local Listings:**
   - [ ] Update Yelp with jazz night info
   - [ ] List on TripAdvisor with "live music" tag
   - [ ] Submit to Toronto.com events
   - [ ] Add to BlogTO directory

4. **Content:**
   - [ ] Write blog post about your jazz night experience
   - [ ] Create "Meet the Musicians" series
   - [ ] Share behind-the-scenes jazz night prep

---

## Success Metrics (3-Month Goals)

**Traffic:**
- 50% increase in organic traffic to /events page
- 100+ impressions/week for "toronto jazz night"
- 5%+ CTR from search results

**Rankings:**
- Top 3 for "east end jazz night"
- Top 5 for "toronto jazz night"
- Top 10 for "live jazz toronto"

**Conversions:**
- 20% increase in event page visits → reservations
- 10+ reviews mentioning "jazz night"
- Featured in local press/blogs

---

*Last updated: December 17, 2025*

