import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="relative overflow-hidden rounded-3xl p-8 mb-12 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 shadow-2xl">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-6 max-w-lg">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Get Interview-Ready with{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  AI-Powered
                </span>{" "}
                Practice & Feedback
              </h2>
              <p className="text-lg text-gray-300">
                Practice real interview questions & get instant feedback
              </p>

              <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-6 px-8 rounded-xl max-sm:w-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <Link href="/interview">Start an Interview</Link>
              </Button>
            </div>

            <Image
              src="/robot.png"
              alt="robo-dude"
              width={400}
              height={400}
              className="max-sm:hidden hover:scale-105 transition-all duration-300 drop-shadow-2xl"
              priority
            />
          </div>
        </section>

        <section className="flex flex-col gap-6 mb-12">
          <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">
            Your Interviews
          </h2>

          <div className="interviews-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hasPastInterviews ? (
              userInterviews?.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700">
                <p className="text-gray-400">You haven&apos;t taken any interviews yet</p>
              </div>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">
            Take Interviews
          </h2>

          <div className="interviews-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hasUpcomingInterviews ? (
              allInterview?.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700">
                <p className="text-gray-400">There are no interviews available</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Created with{" "}
            <span className="text-red-500 animate-pulse">❤️</span> by{" "}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Keshav Dayal
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
