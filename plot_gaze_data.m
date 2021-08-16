
img = imread('experiment.jpg');
tmp = importdata('gaze_data.txt');

figure(1);
plot(tmp(:,2), tmp(:,3), 'k-o')

figure(2);
hold ("on");
imshow(img);
plot(tmp(:,2), tmp(:,3), 'm-o', 'linewidth', 2)
hold ("off");
