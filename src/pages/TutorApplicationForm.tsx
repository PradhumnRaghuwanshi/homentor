import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const applicationSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  degree: z.string().min(2, { message: "Degree information is required." }),
  university: z.string().min(2, { message: "University name is required." }),
  graduationYear: z.coerce.number().min(1900).max(new Date().getFullYear() + 5, { message: "Please enter a valid graduation year." }),
  subjects: z.string().min(3, { message: "Please list the subjects you can teach." }),
  experienceYears: z.coerce.number().min(0, { message: "Experience cannot be negative." }),
  experienceDescription: z.string().min(10, { message: "Please describe your experience." }).max(500, { message: "Description too long." }),
  availability: z.string().min(5, { message: "Please describe your availability." }),
  agreeToPolicy: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions." }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const TutorApplicationForm: React.FC = () => {
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      degree: '',
      university: '',
      graduationYear: undefined,
      subjects: '',
      experienceYears: 0,
      experienceDescription: '',
      availability: '',
      agreeToPolicy: false,
    },
  });

  const onSubmit = (data: ApplicationFormValues) => {
    console.log('Tutor Application Data:', data);
    toast({
      title: "Application Submitted!",
      description: "Thank you for applying. We will review your application and get back to you soon.",
      className: "bg-green-500 text-white",
    });
    form.reset(); // Optionally reset form
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-blue-700">Tutor Application Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <fieldset className="border p-4 rounded-md border-blue-300">
              <legend className="text-lg font-semibold text-blue-600 px-2">Personal Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-700">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="border-blue-300 focus:border-yellow-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-700">Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} className="border-blue-300 focus:border-yellow-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-700">Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="123-456-7890" {...field} className="border-blue-300 focus:border-yellow-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-700">Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, Anytown" {...field} className="border-blue-300 focus:border-yellow-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </fieldset>

            <fieldset className="border p-4 rounded-md border-blue-300">
              <legend className="text-lg font-semibold text-blue-600 px-2">Educational Background</legend>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-700">Degree</FormLabel>
                      <FormControl>
                        <Input placeholder="B.Sc. Computer Science" {...field} className="border-blue-300 focus:border-yellow-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="university"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-700">University</FormLabel>
                      <FormControl>
                        <Input placeholder="University of Example" {...field} className="border-blue-300 focus:border-yellow-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="graduationYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-700">Graduation Year</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2020" {...field} className="border-blue-300 focus:border-yellow-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </fieldset>

            <fieldset className="border p-4 rounded-md border-blue-300">
              <legend className="text-lg font-semibold text-blue-600 px-2">Tutoring Experience</legend>
              <div className="space-y-4 mt-2">
                <FormField
                  control={form.control}
                  name="subjects"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-700">Subjects You Can Teach</FormLabel>
                      <FormControl>
                        <Input placeholder="Math, Physics, Chemistry" {...field} className="border-blue-300 focus:border-yellow-500" />
                      </FormControl>
                      <FormDescription className="text-blue-500">
                        Please list all subjects you are proficient in.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experienceYears"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-700">Years of Experience</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="3" {...field} className="border-blue-300 focus:border-yellow-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experienceDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-700">Describe Your Experience</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Briefly describe your teaching methods and past experiences..." {...field} className="border-blue-300 focus:border-yellow-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </fieldset>

            <fieldset className="border p-4 rounded-md border-blue-300">
              <legend className="text-lg font-semibold text-blue-600 px-2">Availability</legend>
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel className="text-blue-700">Your Availability</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Weekdays 5 PM - 8 PM, Weekends 10 AM - 4 PM" {...field} className="border-blue-300 focus:border-yellow-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
            
            <FormField
              control={form.control}
              name="agreeToPolicy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-blue-300 p-4 shadow bg-blue-100">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-blue-400 data-[state=checked]:bg-yellow-500 data-[state=checked]:text-blue-800"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-blue-700">
                      I agree to the terms and conditions of HOMENTOR.
                    </FormLabel>
                    <FormDescription className="text-blue-600">
                      Please review our <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-600">terms and conditions</a> before applying.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-semibold py-3 text-lg" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TutorApplicationForm;