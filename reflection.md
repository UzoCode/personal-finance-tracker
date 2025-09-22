
---

# 📄 Draft `reflection.md`
```markdown
# Reflection on AI in the Development of Personal Finance Tracker

The **personal-finance-tracker** was developed as a full-stack project with NestJS and React.  
The goal was to implement secure authentication and a foundation for tracking personal finance.  
AI played a key role throughout, from backend scaffolding to frontend wiring and debugging.

---

## How AI Impacted the Build Process
AI accelerated development by scaffolding both backend and frontend pieces. It generated working NestJS modules (`auth.service.ts`, `jwt.strategy.ts`, `jwt-auth.guard.ts`) and React’s `AuthContext` with token persistence.  
When PostgreSQL and Prisma caused connection errors, AI walked through troubleshooting, including checking `systemctl`, migrations, and environment variables.

On the frontend, AI helped debug React Context errors (`Property 'user' does not exist on type 'unknown'`), ensuring correct TypeScript types. It also helped set up protected routes using stored JWT tokens.

Finally, AI drafted documentation (README and reflection), which greatly reduced time spent writing project docs.

---

## What Worked Well
- **Scaffolding speed:** Backend and frontend auth flow came together quickly with AI-generated code.
- **Debugging support:** AI was valuable when errors (Prisma P1001, blank React page) appeared, suggesting systematic fixes.
- **Consistency:** AI kept backend and frontend aligned in terms of payloads (user + token shape).

---

## What Felt Limiting
- **Over-suggestions:** AI sometimes produced multiple fixes, requiring judgment to select the right one.
- **Context memory:** Long sessions required re-sharing code for AI to continue effectively.
- **Environment gap:** Database setup still required hands-on fixes AI couldn’t automate.

---

## What I Learned
1. **Prompting matters** — precise prompts yield better, more accurate scaffolding.
2. **Review is essential** — AI-generated code works, but must be validated for security and correctness.
3. **Iteration is key** — testing AI’s code, then refining based on errors, creates a productive cycle.
4. **AI as a partner** — treating AI as a coding partner instead of a replacement yields the best outcomes.

---

## Conclusion
AI accelerated the creation of a **secure, full-stack personal finance tracker** with authentication and a starting point for finance management.  
While AI saved significant development and documentation time, human oversight was necessary for database setup, security verification, and code testing.  
The project highlights how AI can be a powerful collaborator in full-stack development, especially for scaffolding, debugging, and documentation.
