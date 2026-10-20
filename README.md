# ⚽ Futsal Court Management & Booking System (Next.js)

Built strictly in accordance with **SADP (Software Architecture & Design Patterns / Principles)** rules, designed for rapid scaling, clean maintenance, and decoupled UI integration.

---

## 🏛️ 1. SADP Architectural Rules Implemented

| SADP Principle / Rule | Implementation in Codebase |
| :--- | :--- |
| **Separation of Concerns (SoC)** | Strict layer boundaries: `Presentation` (React/Next.js UI) ➔ `Application` (Use Cases / Server Actions) ➔ `Domain` (Entities / Invariants) ➔ `Infrastructure` (Database / Gateways). |
| **Dependency Inversion Principle (DIP)** | Domain and Use Cases depend only on pure interfaces (`ICourtRepository`, `IPaymentGateway`). Concrete implementations (Prisma, Stripe) are injected adapters. |
| **Single Responsibility Principle (SRP)** | Every class and file handles one task: `CreateBookingUseCase` orchestrates reservation; `SlotCollisionRule` validates overlap; `PricingCalculatorService` calculates rates. |
| **Strategy Pattern (GoF)** | Interchangeable slot pricing algorithms (`PeakHourPricingStrategy`, `WeekendPricingStrategy`, `RegularPricingStrategy`) in `src/modules/pricing/domain/strategies/`. |
| **Repository Pattern** | Decoupled persistence layer (`ICourtRepository`, `IBookingRepository`) allowing switching between in-memory mock and PostgreSQL/Prisma without modifying business logic. |
| **Adapter Pattern (GoF)** | External integrations (`StripePaymentAdapter`, `CashCounterAdapter`) normalized under the unified `IPaymentGateway` contract. |
| **Factory Pattern (GoF)** | `PaymentGatewayFactory` for runtime instantiation of payment providers. |
| **Functional Result Pattern** | `Result<T, E>` in `src/shared/types/result.type.ts` prevents unhandled exception bubbling across architectural boundaries. |

---

## 📁 2. Complete Folder Structure

```text
futsal-court/
├── prisma/
│   └── schema.prisma                           # Database schema (Courts, Bookings, Slots)
│
├── public/                                     # Static assets & icons
│
├── src/
│   ├── app/                                    # 🌐 [PRESENTATION LAYER - Next.js App Router]
│   │   ├── (customer)/                         # Customer-facing views
│   │   │   ├── courts/
│   │   │   │   ├── page.tsx                    # Pitch catalog & filter
│   │   │   │   └── [courtId]/
│   │   │   │       ├── page.tsx                # Pitch detail & slot matrix
│   │   │   │       └── booking-client-form.tsx # Interactive slot selector & reservation UI
│   │   │   └── my-bookings/
│   │   │       └── page.tsx                    # Player booking lookup
│   │   ├── (admin)/                            # Staff & Arena Operations Portal
│   │   │   └── admin/
│   │   │       ├── dashboard/page.tsx          # Real-time KPIs & pitch occupancy
│   │   │       └── scheduler/page.tsx          # Live daily pitch grid (Matrix view)
│   │   ├── api/                                # Inbound Webhooks & HTTP Endpoints
│   │   │   └── webhooks/payment/route.ts       # Payment confirmation webhook
│   │   ├── globals.css                         # Tailwind CSS styling
│   │   ├── layout.tsx                          # Root layout with responsive navigation
│   │   └── page.tsx                            # Hero landing page
│   │
│   ├── config/                                 # ⚙️ [SYSTEM CONFIGURATION]
│   │   └── futsal.config.ts                    # Business hours, slot intervals, peak multipliers
│   │
│   ├── modules/                                # 🧩 [DOMAIN & FEATURE SLICES (SADP CORE)]
│   │   ├── courts/                             # Pitch & Arena Domain
│   │   │   ├── domain/
│   │   │   │   ├── entities/court.entity.ts    # Rich Court domain entity
│   │   │   │   ├── value-objects/surface-type.vo.ts # Turfs (Rubber, Artificial, Hybrid)
│   │   │   │   └── repositories/court.repository.interface.ts # Port
│   │   │   ├── application/
│   │   │   │   └── use-cases/get-courts.use-case.ts # Application interactor
│   │   │   └── infrastructure/
│   │   │       └── repositories/mock-court.repository.ts # In-memory adapter (swap with Prisma)
│   │   │
│   │   ├── bookings/                           # Reservation & Scheduling Domain
│   │   │   ├── domain/
│   │   │   │   ├── entities/booking.entity.ts  # Booking aggregate root
│   │   │   │   ├── entities/time-slot.entity.ts
│   │   │   │   ├── rules/slot-collision.rule.ts # Invariant: double-booking prevention
│   │   │   │   └── repositories/booking.repository.interface.ts
│   │   │   ├── application/
│   │   │   │   ├── use-cases/create-booking.use-case.ts # Core booking orchestrator
│   │   │   │   └── actions/booking.actions.ts  # Next.js Server Actions ("use server")
│   │   │   └── infrastructure/
│   │   │       └── repositories/mock-booking.repository.ts
│   │   │
│   │   ├── pricing/                            # Dynamic Pricing Engine (Strategy Pattern)
│   │   │   ├── domain/
│   │   │   │   ├── strategies/
│   │   │   │   │   ├── pricing-strategy.interface.ts # Strategy interface
│   │   │   │   │   ├── regular-pricing.strategy.ts
│   │   │   │   │   ├── peak-hour-pricing.strategy.ts # 5 PM - 10 PM surcharge
│   │   │   │   │   └── weekend-pricing.strategy.ts   # Weekend rates
│   │   │   │   └── services/pricing-calculator.service.ts
│   │   │
│   │   ├── payments/                           # Payment Adapters (Adapter & Factory Pattern)
│   │   │   ├── domain/
│   │   │   │   └── interfaces/payment-gateway.interface.ts
│   │   │   └── infrastructure/
│   │   │       ├── adapters/
│   │   │       │   ├── stripe-payment.adapter.ts
│   │   │       │   └── cash-counter.adapter.ts # On-site arena payment
│   │   │       └── factories/payment-gateway.factory.ts
│   │   │
│   │   └── users/                              # Players & Staff Domain
│   │       └── domain/entities/user.entity.ts
│   │
│   └── shared/                                 # 🔄 [SHARED CORE & CROSS-CUTTING]
│       ├── components/                         # Shared UI atoms & layout (Navbar, Footer)
│       ├── lib/
│       │   ├── db.ts                           # Database client singleton (Singleton Pattern)
│       │   └── utils.ts                        # Formatters (currency, time slots, cn)
│       └── types/
│           └── result.type.ts                  # Functional Result<T, E> error handling
│
├── .env.example                                # Environment variable documentation
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json                               # Path alias: @/* -> ./src/*
```

---

## 🔌 3. How to Plug in Your UI

Since the architecture separates UI from business rules, you can replace or customize any visual component without touching the core domain logic:

1. **Pages**: All route entry points live in `src/app/`. Simply adjust styling and layout.
2. **Form Submission**: Wire your form or modal to call `createBookingAction` from `@/modules/bookings/application/actions/booking.actions`.
3. **Data Display**: Server components fetch courts via `courtRepository.findAllActive()` or use cases.
