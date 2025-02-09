'use client';

import { FaTelegram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import { Button } from '../ui/button';
import { PinContainer } from '../ui/3d-pin';

export function ContactSection() {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 md:grid-cols-2 items-center">
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="space-y-8"
          >
            {/* Social Links */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-mysteria bg-clip-text text-transparent">Join Our Community</h2>
                <p className="text-muted-foreground mb-8">
                  Connect with us across our Web3 ecosystem and stay updated with
                  the latest Mysteria developments.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-mysteria-cyan/20 hover:border-mysteria-cyan hover:bg-mysteria-cyan/10"
                  onClick={() => window.open('https://t.me/Mysteria', '_blank')}
                >
                  <FaTelegram className="mr-2 h-5 w-5 text-mysteria-cyan" />
                  Telegram
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-mysteria-cyan/20 hover:border-mysteria-cyan hover:bg-mysteria-cyan/10"
                  onClick={() =>
                    window.open('https://x.com/Mysteria', '_blank')
                  }
                >
                  <FaXTwitter className="mr-2 h-5 w-5 text-mysteria-cyan" />X
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-mysteria-cyan/20 hover:border-mysteria-cyan hover:bg-mysteria-cyan/10"
                  onClick={() =>
                    window.open('https://youtube.com/@Mysteria', '_blank')
                  }
                >
                  <FaYoutube className="mr-2 h-5 w-5 text-mysteria-cyan" />
                  YouTube
                </Button>
              </div>
            </div>
          </div>
          {/* BitsCrunch Link */}
          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            className="flex items-center justify-center"
          >
            <div className="flex items-center justify-center">
              <PinContainer title="Built on BitsCrunch" href="https://bitscrunch.org">
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                    Powered by BitsCrunch
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-500">
                      Experience enhanced security and efficiency with BitsCrunch's
                      advanced blockchain infrastructure powering our NFT gacha platform.
                    </span>
                  </div>
                  <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-mysteria" />
                </div>
              </PinContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}