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
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="card-cta bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-6 max-w-lg">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Get Interview-Ready with AI-Powered Practice & Feedback
              </h2>
              <p className="text-lg text-gray-600">
                Practice real interview questions & get instant feedback
              </p>

              <Button asChild className="btn-primary max-sm:w-full hover:scale-105 transition-transform">
                <Link href="/interview">Start an Interview</Link>
              </Button>
            </div>

            <Image
              src="/robot.png"
              alt="robo-dude"
              width={400}
              height={400}
              className="max-sm:hidden hover:scale-105 transition-transform"
              priority
            />
          </div>
        </section>

        <section className="flex flex-col gap-6 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
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
              <div className="col-span-full text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">You haven&apos;t taken any interviews yet</p>
              </div>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
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
              <div className="col-span-full text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">There are no interviews available</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            Created with ❤️ by{" "}
            <span className="font-semibold text-indigo-600">Keshav Dayal</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
