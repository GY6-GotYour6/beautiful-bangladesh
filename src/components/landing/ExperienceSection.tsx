/** Experience stamps — Figma 466:1232 */
export function ExperienceSection() {
  return (
    <div
      className="relative flex flex-col gap-[10px] items-center justify-center p-[80px] w-full"
      style={{ background: '#f5de8f' }}
      data-node-id="466:1232"
    >
      {/* Tiled texture overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute bg-[#f5de8f] inset-0" />
        <div
          className="absolute inset-0 mix-blend-overlay opacity-30"
          style={{
            backgroundImage: 'url(/landing/experience/pattern.png)',
            backgroundSize: '204.8px 204.8px',
            backgroundPosition: 'top left',
          }}
        />
      </div>

      <div className="relative flex flex-col gap-[48px] items-center justify-center shrink-0">
        {/* Title */}
        <p
          className="font-[family-name:var(--font-body)] font-medium text-[32px] text-[#39260b] text-center tracking-[-0.96px] w-[352px] leading-[normal]"
          data-node-id="466:1234"
        >
          Experience it{' '}
          <span className="font-[family-name:var(--font-script)] font-bold">once</span>
          {' & it will '}
          <span className="font-[family-name:var(--font-script)] font-bold">live in</span>
          {' you forever'}
        </p>

        {/* Stamp row */}
        <div className="flex gap-[32px] items-center justify-center relative shrink-0 w-full" data-node-id="466:1235">

          {/* Shopping */}
          <div
            className="inline-grid place-items-start leading-[0] relative shrink-0"
            style={{ gridTemplateColumns: 'max-content', gridTemplateRows: 'max-content' }}
            data-node-id="466:1236"
          >
            <div
              className="relative h-[203.84px] w-[194.88px]"
              style={{ gridColumn: 1, gridRow: 1, marginLeft: 14, marginTop: 9.95 }}
            >
              <div aria-hidden className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="absolute max-w-none size-full object-cover" src="/landing/experience/shopping.png" draggable={false} />
                </div>
                <div className="absolute bg-[rgba(0,0,0,0.2)] inset-0" />
              </div>
            </div>
            <div
              className="pointer-events-none relative flex h-[203.84px] w-[194.88px] items-center justify-center"
              style={{ gridColumn: 1, gridRow: 1, marginLeft: 14, marginTop: 9.95 }}
            >
              <p
                className="font-[family-name:var(--font-script)] leading-[normal] text-[#f8ff98] text-[24px] text-center tracking-[-1.92px] whitespace-nowrap"
                style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
              >
                Shopping
              </p>
            </div>
            <div
              className="h-[224px] relative w-[222.88px]"
              style={{ gridColumn: 1, gridRow: 1 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/landing/experience/stamp-shopping.svg" draggable={false} />
            </div>
          </div>

          {/* Activities */}
          <div
            className="inline-grid place-items-start leading-[0] relative shrink-0"
            style={{ gridTemplateColumns: 'max-content', gridTemplateRows: 'max-content' }}
            data-node-id="466:1240"
          >
            <div
              className="relative h-[247px] w-[239px]"
              style={{ gridColumn: 1, gridRow: 1, marginLeft: 16, marginTop: 11 }}
            >
              <div aria-hidden className="absolute inset-0 pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="absolute max-w-none object-cover size-full" src="/landing/experience/activities.png" draggable={false} />
                <div className="absolute bg-[rgba(0,0,0,0.2)] inset-0" />
              </div>
            </div>
            <div
              className="h-[247.967px] w-[243.124px]"
              style={{ gridColumn: 1, gridRow: 1, marginLeft: 13.44, marginTop: 10.52 }}
            />
            <div
              className="h-[272px] relative w-[271px]"
              style={{ gridColumn: 1, gridRow: 1 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/landing/experience/stamp-activities.svg" draggable={false} />
            </div>
            <div
              className="pointer-events-none relative flex h-[247px] w-[239px] items-center justify-center"
              style={{ gridColumn: 1, gridRow: 1, marginLeft: 16, marginTop: 11 }}
            >
              <p
                className="font-[family-name:var(--font-script)] leading-[normal] opacity-90 text-[#f8ff98] text-[32px] text-center tracking-[-2.56px] whitespace-nowrap"
                style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
              >
                Activities
              </p>
            </div>
          </div>

          {/* Food & Drinks (center, largest) */}
          <div className="h-[301px] overflow-clip relative shrink-0 w-[300px]" data-node-id="466:1245">
            <div className="absolute h-[270px] left-[18.44px] top-[15px] w-[263px]">
              <div aria-hidden className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="absolute max-w-none object-cover size-full" src="/landing/experience/food.png" draggable={false} />
                </div>
                <div className="absolute bg-[rgba(0,0,0,0.2)] inset-0" />
              </div>
            </div>
            <div className="pointer-events-none absolute flex h-[270px] left-[18.44px] top-[15px] w-[263px] items-center justify-center">
              <p
                className="font-[family-name:var(--font-script)] leading-[normal] text-[#f8ff98] text-[36px] text-center tracking-[-2.88px] whitespace-nowrap"
                style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
              >
                Food & Drinks
              </p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[299px] left-[calc(50%+1px)] top-1/2 w-[300px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/landing/experience/stamp-food.svg" draggable={false} />
            </div>
          </div>

          {/* Culture */}
          <div
            className="inline-grid place-items-start leading-[0] relative shrink-0"
            style={{ gridTemplateColumns: 'max-content', gridTemplateRows: 'max-content' }}
            data-node-id="466:1249"
          >
            <div
              className="h-[247.967px] overflow-clip relative w-[243.124px]"
              style={{ gridColumn: 1, gridRow: 1, marginLeft: 14.44, marginTop: 12.52 }}
            >
              <div className="absolute h-[251.096px] right-[-59.78px] top-[-1px] w-[361.656px]">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="absolute max-w-none object-cover size-full" src="/landing/experience/culture.png" draggable={false} />
                  <div className="absolute bg-[rgba(0,0,0,0.2)] inset-0" />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <p
                  className="font-[family-name:var(--font-script)] leading-[normal] text-[#f8ff98] text-[32px] text-center tracking-[-2.56px] whitespace-nowrap"
                  style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
                >
                  Culture
                </p>
              </div>
            </div>
            <div
              className="h-[275px] relative w-[274px]"
              style={{ gridColumn: 1, gridRow: 1 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/landing/experience/stamp-culture.svg" draggable={false} />
            </div>
          </div>

          {/* History */}
          <div
            className="inline-grid place-items-start leading-[0] relative shrink-0"
            style={{ gridTemplateColumns: 'max-content', gridTemplateRows: 'max-content' }}
            data-node-id="466:1254"
          >
            <div
              className="relative h-[201px] w-[195px]"
              style={{ gridColumn: 1, gridRow: 1, marginLeft: 13, marginTop: 11.84 }}
            >
              <div aria-hidden className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="absolute max-w-none object-cover size-full" src="/landing/experience/history.png" draggable={false} />
                </div>
                <div className="absolute bg-[rgba(0,0,0,0.2)] inset-0" />
              </div>
            </div>
            <div
              className="pointer-events-none relative flex h-[201px] w-[195px] items-center justify-center"
              style={{ gridColumn: 1, gridRow: 1, marginLeft: 13, marginTop: 11.84 }}
            >
              <p
                className="font-[family-name:var(--font-script)] leading-[normal] text-[#f8ff98] text-[24px] text-center tracking-[-1.92px] whitespace-nowrap"
                style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
              >
                History
              </p>
            </div>
            <div
              className="h-[224px] relative w-[223px]"
              style={{ gridColumn: 1, gridRow: 1 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/landing/experience/stamp-history.svg" draggable={false} />
            </div>
          </div>

          {/* Left edge fade */}
          <div
            className="pointer-events-none -translate-y-1/2 absolute flex h-[579px] items-center justify-center left-[-50px] top-1/2 w-[233px]"
            aria-hidden="true"
          >
            <div className="-scale-y-100 rotate-180 flex-none">
              <div className="bg-gradient-to-r from-[rgba(241,209,96,0)] h-[579px] to-[#f4df92] to-[125.47%] w-[233px]" />
            </div>
          </div>
          {/* Right edge fade */}
          <div
            className="pointer-events-none absolute bg-gradient-to-r from-[rgba(241,209,96,0)] h-[579px] right-[-60px] to-[#f4df92] to-[125.47%] top-0 w-[234px]"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  )
}
